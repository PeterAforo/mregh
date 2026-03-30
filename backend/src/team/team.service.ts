import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TeamService {
  constructor(private prisma: PrismaService) {}

  findAll(published?: boolean) {
    const where = published !== undefined ? { published } : {};
    return this.prisma.teamMember.findMany({ where, orderBy: { order: 'asc' } });
  }

  async findById(id: number) {
    const member = await this.prisma.teamMember.findUnique({ where: { id } });
    if (!member) throw new NotFoundException('Team member not found');
    return member;
  }

  create(dto: any) {
    return this.prisma.teamMember.create({ data: dto });
  }

  async update(id: number, dto: any) {
    await this.findById(id);
    return this.prisma.teamMember.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findById(id);
    return this.prisma.teamMember.delete({ where: { id } });
  }
}
