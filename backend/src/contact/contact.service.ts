import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } });
  }

  findUnread() {
    return this.prisma.contactMessage.findMany({ where: { read: false }, orderBy: { createdAt: 'desc' } });
  }

  async findById(id: number) {
    const msg = await this.prisma.contactMessage.findUnique({ where: { id } });
    if (!msg) throw new NotFoundException('Message not found');
    return msg;
  }

  create(dto: any) {
    return this.prisma.contactMessage.create({ data: dto });
  }

  async markRead(id: number) {
    await this.findById(id);
    return this.prisma.contactMessage.update({ where: { id }, data: { read: true } });
  }

  async remove(id: number) {
    await this.findById(id);
    return this.prisma.contactMessage.delete({ where: { id } });
  }

  async getStats() {
    const total = await this.prisma.contactMessage.count();
    const unread = await this.prisma.contactMessage.count({ where: { read: false } });
    return { total, unread };
  }
}
