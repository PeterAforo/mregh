import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { BlogService } from './blog.service';
import { PrismaService } from '../prisma/prisma.service';

const mockPrisma = {
  blogPost: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe('BlogService', () => {
  let service: BlogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlogService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();
    service = module.get<BlogService>(BlogService);
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('returns all posts when no filter', async () => {
      mockPrisma.blogPost.findMany.mockResolvedValue([{ id: 1, title: 'Post 1' }]);
      const result = await service.findAll();
      expect(result).toHaveLength(1);
    });

    it('filters by published=true', async () => {
      mockPrisma.blogPost.findMany.mockResolvedValue([]);
      await service.findAll(true);
      expect(mockPrisma.blogPost.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ where: expect.objectContaining({ published: true }) }),
      );
    });
  });

  describe('findBySlug', () => {
    it('returns post when found by slug', async () => {
      mockPrisma.blogPost.findUnique.mockResolvedValue({ id: 1, slug: 'my-post' });
      const result = await service.findBySlug('my-post');
      expect(result).toEqual({ id: 1, slug: 'my-post' });
    });

    it('throws NotFoundException when slug not found', async () => {
      mockPrisma.blogPost.findUnique.mockResolvedValue(null);
      await expect(service.findBySlug('missing')).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('creates a blog post with auto slug', async () => {
      const dto = { title: 'My Blog Post' } as any;
      mockPrisma.blogPost.create.mockResolvedValue({ id: 1, ...dto, slug: 'my-blog-post' });
      const result = await service.create(dto);
      expect(mockPrisma.blogPost.create).toHaveBeenCalledWith({
        data: expect.objectContaining({ slug: expect.any(String) }),
      });
      expect(result.id).toBe(1);
    });
  });

  describe('update', () => {
    it('updates blog post when found', async () => {
      mockPrisma.blogPost.findUnique.mockResolvedValue({ id: 1, slug: 'old-post' });
      mockPrisma.blogPost.update.mockResolvedValue({ id: 1, title: 'Updated' });
      await service.update(1, { title: 'Updated' } as any);
      expect(mockPrisma.blogPost.update).toHaveBeenCalledWith(
        expect.objectContaining({ where: { id: 1 } }),
      );
    });

    it('throws NotFoundException when updating non-existent post', async () => {
      mockPrisma.blogPost.findUnique.mockResolvedValue(null);
      await expect(service.update(999, { title: 'X' } as any)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('deletes blog post when found', async () => {
      mockPrisma.blogPost.findUnique.mockResolvedValue({ id: 1 });
      mockPrisma.blogPost.delete.mockResolvedValue({ id: 1 });
      await service.remove(1);
      expect(mockPrisma.blogPost.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('throws NotFoundException when deleting non-existent post', async () => {
      mockPrisma.blogPost.findUnique.mockResolvedValue(null);
      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
