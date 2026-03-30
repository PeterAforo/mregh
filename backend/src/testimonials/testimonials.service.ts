import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TestimonialsService {
  constructor(private prisma: PrismaService) {}

  findAll(published?: boolean) {
    const where = published !== undefined ? { published } : {};
    return this.prisma.testimonial.findMany({ where, orderBy: { order: 'asc' } });
  }

  async findById(id: number) {
    const item = await this.prisma.testimonial.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Testimonial not found');
    return item;
  }

  create(dto: any) {
    return this.prisma.testimonial.create({ data: dto });
  }

  async update(id: number, dto: any) {
    await this.findById(id);
    return this.prisma.testimonial.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findById(id);
    return this.prisma.testimonial.delete({ where: { id } });
  }
}
