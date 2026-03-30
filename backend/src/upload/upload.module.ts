import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import * as os from 'os';
import { UploadController } from './upload.controller';

@Module({
  imports: [MulterModule.register({ dest: os.tmpdir() })],
  controllers: [UploadController],
})
export class UploadModule {}
