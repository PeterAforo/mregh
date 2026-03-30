import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import slugify from 'slugify';

@Injectable()
export class BlogService {
  constructor(private prisma: PrismaService) {}

  findAll(published?: boolean) {
    const where = published !== undefined ? { published } : {};
    return this.prisma.blogPost.findMany({ where, orderBy: { createdAt: 'desc' } });
  }

  async findBySlug(slug: string) {
    const post = await this.prisma.blogPost.findUnique({ where: { slug } });
    if (!post) throw new NotFoundException('Blog post not found');
    return post;
  }

  async findById(id: number) {
    const post = await this.prisma.blogPost.findUnique({ where: { id } });
    if (!post) throw new NotFoundException('Blog post not found');
    return post;
  }

  create(dto: any) {
    const slug = slugify(dto.title, { lower: true, strict: true });
    const publishedAt = dto.published ? new Date() : null;
    return this.prisma.blogPost.create({ data: { ...dto, slug, publishedAt } });
  }

  async update(id: number, dto: any) {
    await this.findById(id);
    const data: any = { ...dto };
    if (dto.title) data.slug = slugify(dto.title, { lower: true, strict: true });
    if (dto.published && !data.publishedAt) data.publishedAt = new Date();
    return this.prisma.blogPost.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findById(id);
    return this.prisma.blogPost.delete({ where: { id } });
  }
}
