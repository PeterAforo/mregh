import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import slugify from 'slugify';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  findAll(published?: boolean) {
    const where = published !== undefined ? { published } : {};
    return this.prisma.service.findMany({ where, orderBy: { order: 'asc' } });
  }

  async findBySlug(slug: string) {
    const service = await this.prisma.service.findUnique({ where: { slug } });
    if (!service) throw new NotFoundException('Service not found');
    return service;
  }

  async findById(id: number) {
    const service = await this.prisma.service.findUnique({ where: { id } });
    if (!service) throw new NotFoundException('Service not found');
    return service;
  }

  create(dto: any) {
    const slug = slugify(dto.title, { lower: true, strict: true });
    return this.prisma.service.create({ data: { ...dto, slug } });
  }

  async update(id: number, dto: any) {
    await this.findById(id);
    const data: any = { ...dto };
    if (dto.title) data.slug = slugify(dto.title, { lower: true, strict: true });
    return this.prisma.service.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findById(id);
    return this.prisma.service.delete({ where: { id } });
  }
}
