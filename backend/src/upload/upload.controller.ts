import { Controller, Post, UseInterceptors, UploadedFile, UseGuards, Delete, Param, Get } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PrismaService } from '../prisma/prisma.service';
import * as fs from 'fs';

@ApiTags('upload')
@Controller('upload')
export class UploadController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: process.env.VERCEL ? '/tmp' : join(process.cwd(), 'uploads'),
      filename: (req, file, cb) => {
        const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, unique + extname(file.originalname));
      },
    }),
    limits: { fileSize: 10 * 1024 * 1024 },
  }))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const media = await this.prisma.media.create({
      data: {
        filename: file.originalname,
        path: `/uploads/${file.filename}`,
        mimetype: file.mimetype,
        size: file.size,
      },
    });
    return { url: `/uploads/${file.filename}`, ...media };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findAll() {
    return this.prisma.media.findMany({ orderBy: { createdAt: 'desc' } });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async remove(@Param('id') id: string) {
    const media = await this.prisma.media.findUnique({ where: { id: parseInt(id) } });
    if (media) {
      const filePath = join(process.cwd(), media.path);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      await this.prisma.media.delete({ where: { id: parseInt(id) } });
    }
    return { success: true };
  }
}
