import { Test, TestingModule } from '@nestjs/testing';
import { ContactService } from './contact.service';
import { PrismaService } from '../prisma/prisma.service';

const mockPrisma = {
  contactMessage: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
  },
};

describe('ContactService', () => {
  let service: ContactService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContactService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();
    service = module.get<ContactService>(ContactService);
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('creates a contact message', async () => {
      const dto = { name: 'John', email: 'john@test.com', subject: 'Hello', message: 'Hi there' } as any;
      mockPrisma.contactMessage.create.mockResolvedValue({ id: 1, ...dto, read: false });
      const result = await service.create(dto);
      expect(mockPrisma.contactMessage.create).toHaveBeenCalledWith({ data: dto });
      expect(result.id).toBe(1);
    });
  });

  describe('findAll', () => {
    it('returns all contact messages ordered by date', async () => {
      mockPrisma.contactMessage.findMany.mockResolvedValue([
        { id: 2, name: 'B', read: false },
        { id: 1, name: 'A', read: true },
      ]);
      const result = await service.findAll();
      expect(result).toHaveLength(2);
      expect(mockPrisma.contactMessage.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ orderBy: expect.any(Object) }),
      );
    });
  });

  describe('findUnread', () => {
    it('returns only unread messages', async () => {
      mockPrisma.contactMessage.findMany.mockResolvedValue([{ id: 1, read: false }]);
      const result = await service.findUnread();
      expect(mockPrisma.contactMessage.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ where: { read: false } }),
      );
      expect(result).toHaveLength(1);
    });
  });

  describe('markRead', () => {
    it('marks a message as read', async () => {
      mockPrisma.contactMessage.findUnique.mockResolvedValue({ id: 1, read: false });
      mockPrisma.contactMessage.update.mockResolvedValue({ id: 1, read: true });
      await service.markRead(1);
      expect(mockPrisma.contactMessage.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { read: true },
      });
    });
  });

  describe('remove', () => {
    it('deletes a contact message', async () => {
      mockPrisma.contactMessage.findUnique.mockResolvedValue({ id: 1 });
      mockPrisma.contactMessage.delete.mockResolvedValue({ id: 1 });
      await service.remove(1);
      expect(mockPrisma.contactMessage.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });
});
