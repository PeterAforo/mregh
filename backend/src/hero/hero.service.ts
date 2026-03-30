import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HeroService {
  constructor(private prisma: PrismaService) {}

  findAll(published?: boolean) {
    const where = published !== undefined ? { published } : {};
    return this.prisma.heroSlide.findMany({ where, orderBy: { order: 'asc' } });
  }

  async findById(id: number) {
    const slide = await this.prisma.heroSlide.findUnique({ where: { id } });
    if (!slide) throw new NotFoundException('Hero slide not found');
    return slide;
  }

  create(dto: any) {
    return this.prisma.heroSlide.create({ data: dto });
  }

  async update(id: number, dto: any) {
    await this.findById(id);
    return this.prisma.heroSlide.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findById(id);
    return this.prisma.heroSlide.delete({ where: { id } });
  }
}
