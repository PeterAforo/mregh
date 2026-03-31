import { Controller, Post, UseInterceptors, UploadedFile, UseGuards, Delete, Param, Get, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { memoryStorage } from 'multer';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { PrismaService } from '../prisma/prisma.service';

const MAX_FILE_SIZE = 3 * 1024 * 1024;
const ALLOWED_TYPES = /image\/(jpeg|png|gif|webp|svg\+xml)/;

@ApiTags('upload')
@Controller('upload')
export class UploadController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file', {
    storage: memoryStorage(),
    limits: { fileSize: MAX_FILE_SIZE },
    fileFilter: (req, file, cb) => {
      if (ALLOWED_TYPES.test(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new BadRequestException('Only image files are allowed (JPEG, PNG, GIF, WebP, SVG)'), false);
      }
    },
  }))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('No file uploaded');
    const base64 = file.buffer.toString('base64');
    const dataUrl = `data:${file.mimetype};base64,${base64}`;
    const media = await this.prisma.media.create({
      data: {
        filename: file.originalname,
        path: dataUrl,
        mimetype: file.mimetype,
        size: file.size,
      },
    });
    return { url: dataUrl, ...media };
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  findAll() {
    return this.prisma.media.findMany({
      orderBy: { createdAt: 'desc' },
      select: { id: true, filename: true, mimetype: true, size: true, createdAt: true, path: true },
    });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  async remove(@Param('id') id: string) {
    const mediaId = parseInt(id, 10);
    const media = await this.prisma.media.findUnique({ where: { id: mediaId } });
    if (media) {
      await this.prisma.media.delete({ where: { id: mediaId } });
    }
    return { success: true };
  }
}
