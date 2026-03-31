import { Test, TestingModule } from '@nestjs/testing';
import { SettingsService } from './settings.service';
import { PrismaService } from '../prisma/prisma.service';

const mockPrisma = {
  setting: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    upsert: jest.fn(),
    delete: jest.fn(),
  },
};

describe('SettingsService', () => {
  let service: SettingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SettingsService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();
    service = module.get<SettingsService>(SettingsService);
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('returns all settings', async () => {
      mockPrisma.setting.findMany.mockResolvedValue([
        { key: 'site_name', value: 'MRE', type: 'string', group: 'general' },
      ]);
      const result = await service.findAll();
      expect(result).toHaveLength(1);
      expect(result[0].key).toBe('site_name');
    });
  });

  describe('getByGroup', () => {
    it('returns settings filtered by group', async () => {
      mockPrisma.setting.findMany.mockResolvedValue([
        { key: 'site_name', value: 'MRE', group: 'general' },
      ]);
      await service.getByGroup('general');
      expect(mockPrisma.setting.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ where: { group: 'general' } }),
      );
    });
  });

  describe('findByKey', () => {
    it('returns setting by key', async () => {
      mockPrisma.setting.findUnique.mockResolvedValue({ key: 'site_name', value: 'MRE' });
      const result = await service.findByKey('site_name');
      expect(result).toEqual({ key: 'site_name', value: 'MRE' });
    });

    it('returns null when key not found', async () => {
      mockPrisma.setting.findUnique.mockResolvedValue(null);
      const result = await service.findByKey('missing_key');
      expect(result).toBeNull();
    });
  });

  describe('upsert', () => {
    it('upserts a setting by key', async () => {
      mockPrisma.setting.upsert.mockResolvedValue({ key: 'site_name', value: 'New MRE' });
      await service.upsert('site_name', 'New MRE', 'string', 'general');
      expect(mockPrisma.setting.upsert).toHaveBeenCalledWith({
        where: { key: 'site_name' },
        update: expect.objectContaining({ value: 'New MRE' }),
        create: expect.objectContaining({ key: 'site_name', value: 'New MRE' }),
      });
    });
  });

  describe('remove', () => {
    it('deletes a setting by key', async () => {
      mockPrisma.setting.delete.mockResolvedValue({ key: 'site_name' });
      await service.remove('site_name');
      expect(mockPrisma.setting.delete).toHaveBeenCalledWith({ where: { key: 'site_name' } });
    });
  });

  describe('bulkUpsert', () => {
    it('upserts multiple settings', async () => {
      mockPrisma.setting.upsert.mockResolvedValue({});
      const settings = [
        { key: 'a', value: '1', type: 'string', group: 'g' },
        { key: 'b', value: '2', type: 'string', group: 'g' },
      ];
      await service.bulkUpsert(settings);
      expect(mockPrisma.setting.upsert).toHaveBeenCalledTimes(2);
    });
  });
});
