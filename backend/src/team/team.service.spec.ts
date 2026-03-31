import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { TeamService } from './team.service';
import { PrismaService } from '../prisma/prisma.service';

const mockPrisma = {
  teamMember: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe('TeamService', () => {
  let service: TeamService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeamService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();
    service = module.get<TeamService>(TeamService);
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('returns all team members when no filter', async () => {
      mockPrisma.teamMember.findMany.mockResolvedValue([{ id: 1, name: 'John', position: 'CEO' }]);
      const result = await service.findAll();
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('John');
    });

    it('filters by published=true', async () => {
      mockPrisma.teamMember.findMany.mockResolvedValue([]);
      await service.findAll(true);
      expect(mockPrisma.teamMember.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ where: expect.objectContaining({ published: true }) }),
      );
    });
  });

  describe('create', () => {
    it('creates team member', async () => {
      const dto = { name: 'Jane', position: 'Architect' } as any;
      mockPrisma.teamMember.create.mockResolvedValue({ id: 1, ...dto });
      const result = await service.create(dto);
      expect(mockPrisma.teamMember.create).toHaveBeenCalledWith({ data: dto });
      expect(result.id).toBe(1);
    });
  });

  describe('update', () => {
    it('updates team member when found', async () => {
      mockPrisma.teamMember.findUnique.mockResolvedValue({ id: 1 });
      mockPrisma.teamMember.update.mockResolvedValue({ id: 1, name: 'Updated' });
      await service.update(1, { name: 'Updated' } as any);
      expect(mockPrisma.teamMember.update).toHaveBeenCalledWith(
        expect.objectContaining({ where: { id: 1 } }),
      );
    });

    it('throws NotFoundException when team member not found', async () => {
      mockPrisma.teamMember.findUnique.mockResolvedValue(null);
      await expect(service.update(999, {} as any)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('deletes team member when found', async () => {
      mockPrisma.teamMember.findUnique.mockResolvedValue({ id: 1 });
      mockPrisma.teamMember.delete.mockResolvedValue({ id: 1 });
      await service.remove(1);
      expect(mockPrisma.teamMember.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('throws NotFoundException when team member not found', async () => {
      mockPrisma.teamMember.findUnique.mockResolvedValue(null);
      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
