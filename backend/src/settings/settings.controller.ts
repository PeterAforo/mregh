import { Controller, Get, Post, Delete, Body, Param, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { SettingsService } from './settings.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('settings')
@Controller('settings')
export class SettingsController {
  constructor(private settingsService: SettingsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findAll() {
    return this.settingsService.findAll();
  }

  @Get('group/:group')
  getByGroup(@Param('group') group: string) {
    return this.settingsService.getByGroup(group);
  }

  @Get(':key')
  findByKey(@Param('key') key: string) {
    return this.settingsService.findByKey(key);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  upsert(@Body() dto: any) {
    return this.settingsService.upsert(dto.key, dto.value, dto.type, dto.group);
  }

  @Post('bulk')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  bulkUpsert(@Body() dto: any) {
    return this.settingsService.bulkUpsert(dto.settings);
  }

  @Delete(':key')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  remove(@Param('key') key: string) {
    return this.settingsService.remove(key);
  }
}
