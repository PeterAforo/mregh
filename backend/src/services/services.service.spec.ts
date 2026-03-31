import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ServicesService } from './services.service';
import { PrismaService } from '../prisma/prisma.service';

const mockPrisma = {
  service: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe('ServicesService', () => {
  let service: ServicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServicesService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();
    service = module.get<ServicesService>(ServicesService);
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('returns all services when no filter', async () => {
      mockPrisma.service.findMany.mockResolvedValue([{ id: 1, title: 'Construction' }]);
      const result = await service.findAll();
      expect(result).toHaveLength(1);
    });

    it('filters by published when provided', async () => {
      mockPrisma.service.findMany.mockResolvedValue([]);
      await service.findAll(true);
      expect(mockPrisma.service.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ where: expect.objectContaining({ published: true }) }),
      );
    });
  });

  describe('create', () => {
    it('creates service with auto-generated slug', async () => {
      const dto = { title: 'Interior Design', description: 'Desc' } as any;
      mockPrisma.service.create.mockResolvedValue({ id: 1, ...dto, slug: 'interior-design' });
      const result = await service.create(dto);
      expect(mockPrisma.service.create).toHaveBeenCalledWith({
        data: expect.objectContaining({ slug: 'interior-design' }),
      });
      expect(result.id).toBe(1);
    });
  });

  describe('update', () => {
    it('updates service when found', async () => {
      mockPrisma.service.findUnique.mockResolvedValue({ id: 1 });
      mockPrisma.service.update.mockResolvedValue({ id: 1, title: 'Updated' });
      await service.update(1, { title: 'Updated' } as any);
      expect(mockPrisma.service.update).toHaveBeenCalledWith(
        expect.objectContaining({ where: { id: 1 } }),
      );
    });

    it('throws NotFoundException when service not found', async () => {
      mockPrisma.service.findUnique.mockResolvedValue(null);
      await expect(service.update(999, {} as any)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('deletes service when found', async () => {
      mockPrisma.service.findUnique.mockResolvedValue({ id: 1 });
      mockPrisma.service.delete.mockResolvedValue({ id: 1 });
      await service.remove(1);
      expect(mockPrisma.service.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('throws NotFoundException when service not found', async () => {
      mockPrisma.service.findUnique.mockResolvedValue(null);
      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
