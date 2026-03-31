import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { TestimonialsService } from './testimonials.service';
import { PrismaService } from '../prisma/prisma.service';

const mockPrisma = {
  testimonial: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe('TestimonialsService', () => {
  let service: TestimonialsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TestimonialsService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();
    service = module.get<TestimonialsService>(TestimonialsService);
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('returns all testimonials when no filter', async () => {
      mockPrisma.testimonial.findMany.mockResolvedValue([{ id: 1, name: 'Client A', content: 'Great!' }]);
      const result = await service.findAll();
      expect(result).toHaveLength(1);
    });

    it('filters by published=true', async () => {
      mockPrisma.testimonial.findMany.mockResolvedValue([]);
      await service.findAll(true);
      expect(mockPrisma.testimonial.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ where: expect.objectContaining({ published: true }) }),
      );
    });
  });

  describe('create', () => {
    it('creates a testimonial', async () => {
      const dto = { name: 'Client B', content: 'Excellent work!', rating: 5 } as any;
      mockPrisma.testimonial.create.mockResolvedValue({ id: 2, ...dto });
      const result = await service.create(dto);
      expect(mockPrisma.testimonial.create).toHaveBeenCalledWith({ data: dto });
      expect(result.id).toBe(2);
    });
  });

  describe('update', () => {
    it('updates testimonial when found', async () => {
      mockPrisma.testimonial.findUnique.mockResolvedValue({ id: 1 });
      mockPrisma.testimonial.update.mockResolvedValue({ id: 1, content: 'Updated' });
      await service.update(1, { content: 'Updated' } as any);
      expect(mockPrisma.testimonial.update).toHaveBeenCalledWith(
        expect.objectContaining({ where: { id: 1 } }),
      );
    });

    it('throws NotFoundException when testimonial not found', async () => {
      mockPrisma.testimonial.findUnique.mockResolvedValue(null);
      await expect(service.update(999, {} as any)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('deletes testimonial when found', async () => {
      mockPrisma.testimonial.findUnique.mockResolvedValue({ id: 1 });
      mockPrisma.testimonial.delete.mockResolvedValue({ id: 1 });
      await service.remove(1);
      expect(mockPrisma.testimonial.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('throws NotFoundException when testimonial not found', async () => {
      mockPrisma.testimonial.findUnique.mockResolvedValue(null);
      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
