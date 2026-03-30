import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto, UpdateProjectDto } from './dto/project.dto';
import slugify from 'slugify';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async findAll(published?: boolean) {
    const where = published !== undefined ? { published } : {};
    return this.prisma.project.findMany({ where, orderBy: [{ order: 'asc' }, { createdAt: 'desc' }] });
  }

  async findFeatured() {
    return this.prisma.project.findMany({ where: { featured: true, published: true }, take: 6, orderBy: { order: 'asc' } });
  }

  async findBySlug(slug: string) {
    const project = await this.prisma.project.findUnique({ where: { slug } });
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  async findById(id: number) {
    const project = await this.prisma.project.findUnique({ where: { id } });
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  async create(dto: CreateProjectDto) {
    const slug = slugify(dto.title, { lower: true, strict: true });
    return this.prisma.project.create({ data: { ...dto, slug } });
  }

  async update(id: number, dto: UpdateProjectDto) {
    await this.findById(id);
    const data: any = { ...dto };
    if (dto.title) data.slug = slugify(dto.title, { lower: true, strict: true });
    return this.prisma.project.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findById(id);
    return this.prisma.project.delete({ where: { id } });
  }

  async getCategories() {
    const projects = await this.prisma.project.findMany({ select: { category: true }, distinct: ['category'] });
    return projects.map(p => p.category);
  }
}
