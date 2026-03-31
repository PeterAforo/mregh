import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

jest.mock('bcryptjs');

const mockPrisma = {
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
};

const mockJwt = {
  sign: jest.fn().mockReturnValue('mock-jwt-token'),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: JwtService, useValue: mockJwt },
      ],
    }).compile();
    service = module.get<AuthService>(AuthService);
    jest.clearAllMocks();
    mockJwt.sign.mockReturnValue('mock-jwt-token');
  });

  describe('login', () => {
    it('returns access_token and user on valid credentials', async () => {
      const user = { id: 1, email: 'admin@test.com', password: 'hashed', name: 'Admin', role: 'admin' };
      mockPrisma.user.findUnique.mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.login({ email: 'admin@test.com', password: 'pass' });

      expect(result).toHaveProperty('access_token', 'mock-jwt-token');
      expect(result.user.email).toBe('admin@test.com');
    });

    it('throws UnauthorizedException when user not found', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);
      await expect(service.login({ email: 'x@x.com', password: 'pass' })).rejects.toThrow(UnauthorizedException);
    });

    it('throws UnauthorizedException when password is wrong', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({ id: 1, password: 'hashed' });
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);
      await expect(service.login({ email: 'admin@test.com', password: 'wrong' })).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('register', () => {
    it('creates user and returns access_token', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed-pw');
      mockPrisma.user.create.mockResolvedValue({ id: 2, email: 'new@test.com', name: 'New', role: 'user' });

      const result = await service.register({ email: 'new@test.com', password: 'pass', name: 'New' });

      expect(result).toHaveProperty('access_token');
      expect(mockPrisma.user.create).toHaveBeenCalledWith({
        data: expect.objectContaining({ email: 'new@test.com', password: 'hashed-pw' }),
      });
    });

    it('throws ConflictException when email already exists', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({ id: 1, email: 'existing@test.com' });
      await expect(service.register({ email: 'existing@test.com', password: 'pass', name: 'X' })).rejects.toThrow(ConflictException);
    });
  });

  describe('getProfile', () => {
    it('returns user profile by id', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({ id: 1, email: 'a@b.com', name: 'A', role: 'admin', createdAt: new Date() });
      const result = await service.getProfile(1);
      expect(result).toHaveProperty('email', 'a@b.com');
    });
  });
});
