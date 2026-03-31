import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { HeroService } from './hero.service';
import { PrismaService } from '../prisma/prisma.service';

const mockPrisma = {
  heroSlide: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe('HeroService', () => {
  let service: HeroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HeroService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();
    service = module.get<HeroService>(HeroService);
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('returns all hero slides', async () => {
      mockPrisma.heroSlide.findMany.mockResolvedValue([{ id: 1, title: 'Slide 1' }]);
      const result = await service.findAll();
      expect(result).toHaveLength(1);
    });

    it('filters by published=true', async () => {
      mockPrisma.heroSlide.findMany.mockResolvedValue([]);
      await service.findAll(true);
      expect(mockPrisma.heroSlide.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ where: expect.objectContaining({ published: true }) }),
      );
    });
  });

  describe('create', () => {
    it('creates a hero slide', async () => {
      const dto = { title: 'New Slide', subtitle: 'Sub' } as any;
      mockPrisma.heroSlide.create.mockResolvedValue({ id: 1, ...dto });
      const result = await service.create(dto);
      expect(mockPrisma.heroSlide.create).toHaveBeenCalledWith({ data: dto });
      expect(result.id).toBe(1);
    });
  });

  describe('update', () => {
    it('updates hero slide when found', async () => {
      mockPrisma.heroSlide.findUnique.mockResolvedValue({ id: 1 });
      mockPrisma.heroSlide.update.mockResolvedValue({ id: 1, title: 'Updated' });
      await service.update(1, { title: 'Updated' } as any);
      expect(mockPrisma.heroSlide.update).toHaveBeenCalledWith(
        expect.objectContaining({ where: { id: 1 } }),
      );
    });

    it('throws NotFoundException when hero slide not found', async () => {
      mockPrisma.heroSlide.findUnique.mockResolvedValue(null);
      await expect(service.update(999, {} as any)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('deletes hero slide when found', async () => {
      mockPrisma.heroSlide.findUnique.mockResolvedValue({ id: 1 });
      mockPrisma.heroSlide.delete.mockResolvedValue({ id: 1 });
      await service.remove(1);
      expect(mockPrisma.heroSlide.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('throws NotFoundException when hero slide not found', async () => {
      mockPrisma.heroSlide.findUnique.mockResolvedValue(null);
      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
