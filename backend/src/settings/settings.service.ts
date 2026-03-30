import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SettingsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.setting.findMany({ orderBy: { group: 'asc' } });
  }

  async findByKey(key: string) {
    return this.prisma.setting.findUnique({ where: { key } });
  }

  async getByGroup(group: string) {
    return this.prisma.setting.findMany({ where: { group } });
  }

  async upsert(key: string, value: string, type = 'text', group?: string) {
    return this.prisma.setting.upsert({
      where: { key },
      update: { value, type, group },
      create: { key, value, type, group },
    });
  }

  async bulkUpsert(settings: { key: string; value: string; type?: string; group?: string }[]) {
    const results = [];
    for (const s of settings) {
      results.push(await this.upsert(s.key, s.value, s.type || 'text', s.group));
    }
    return results;
  }

  async remove(key: string) {
    return this.prisma.setting.delete({ where: { key } });
  }
}
