import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { PrismaService } from '../prisma/prisma.service';

const mockPrisma = {
  project: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe('ProjectsService', () => {
  let service: ProjectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectsService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();
    service = module.get<ProjectsService>(ProjectsService);
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('returns all projects when no filter provided', async () => {
      mockPrisma.project.findMany.mockResolvedValue([{ id: 1, title: 'Test' }]);
      const result = await service.findAll();
      expect(mockPrisma.project.findMany).toHaveBeenCalledWith({
        where: {},
        orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
      });
      expect(result).toHaveLength(1);
    });

    it('filters by published=true', async () => {
      mockPrisma.project.findMany.mockResolvedValue([]);
      await service.findAll(true);
      expect(mockPrisma.project.findMany).toHaveBeenCalledWith({
        where: { published: true },
        orderBy: expect.any(Array),
      });
    });

    it('filters by published=false', async () => {
      mockPrisma.project.findMany.mockResolvedValue([]);
      await service.findAll(false);
      expect(mockPrisma.project.findMany).toHaveBeenCalledWith({
        where: { published: false },
        orderBy: expect.any(Array),
      });
    });
  });

  describe('findFeatured', () => {
    it('returns featured published projects limited to 6', async () => {
      mockPrisma.project.findMany.mockResolvedValue([{ id: 1, featured: true, published: true }]);
      const result = await service.findFeatured();
      expect(mockPrisma.project.findMany).toHaveBeenCalledWith({
        where: { featured: true, published: true },
        take: 6,
        orderBy: { order: 'asc' },
      });
      expect(result).toHaveLength(1);
    });
  });

  describe('findBySlug', () => {
    it('returns project when found', async () => {
      mockPrisma.project.findUnique.mockResolvedValue({ id: 1, slug: 'test-project' });
      const result = await service.findBySlug('test-project');
      expect(result).toEqual({ id: 1, slug: 'test-project' });
    });

    it('throws NotFoundException when project slug does not exist', async () => {
      mockPrisma.project.findUnique.mockResolvedValue(null);
      await expect(service.findBySlug('nonexistent')).rejects.toThrow(NotFoundException);
    });
  });

  describe('findById', () => {
    it('returns project when found by id', async () => {
      mockPrisma.project.findUnique.mockResolvedValue({ id: 5, title: 'Found' });
      const result = await service.findById(5);
      expect(result).toEqual({ id: 5, title: 'Found' });
    });

    it('throws NotFoundException when project id does not exist', async () => {
      mockPrisma.project.findUnique.mockResolvedValue(null);
      await expect(service.findById(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('creates project and generates slug from title', async () => {
      const dto = { title: 'New Project', category: 'Residential', location: 'Accra' } as any;
      mockPrisma.project.create.mockResolvedValue({ id: 1, ...dto, slug: 'new-project' });
      const result = await service.create(dto);
      expect(mockPrisma.project.create).toHaveBeenCalledWith({
        data: expect.objectContaining({ slug: 'new-project' }),
      });
      expect(result.slug).toBe('new-project');
    });
  });

  describe('update', () => {
    it('updates project and regenerates slug when title changes', async () => {
      mockPrisma.project.findUnique.mockResolvedValue({ id: 1, title: 'Old' });
      mockPrisma.project.update.mockResolvedValue({ id: 1, title: 'Updated Title', slug: 'updated-title' });
      await service.update(1, { title: 'Updated Title' } as any);
      expect(mockPrisma.project.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: expect.objectContaining({ slug: 'updated-title' }),
      });
    });

    it('throws NotFoundException when updating non-existent project', async () => {
      mockPrisma.project.findUnique.mockResolvedValue(null);
      await expect(service.update(999, { title: 'X' } as any)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('deletes project when found', async () => {
      mockPrisma.project.findUnique.mockResolvedValue({ id: 1 });
      mockPrisma.project.delete.mockResolvedValue({ id: 1 });
      await service.remove(1);
      expect(mockPrisma.project.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('throws NotFoundException when deleting non-existent project', async () => {
      mockPrisma.project.findUnique.mockResolvedValue(null);
      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('getCategories', () => {
    it('returns distinct categories', async () => {
      mockPrisma.project.findMany.mockResolvedValue([
        { category: 'Residential' },
        { category: 'Commercial' },
      ]);
      const result = await service.getCategories();
      expect(result).toEqual(['Residential', 'Commercial']);
    });
  });
});
