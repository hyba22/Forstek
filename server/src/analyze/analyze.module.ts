import { Module } from '@nestjs/common';
import { AnalyzeService } from './analyze.service';
import { AnalyzeController } from './analyze.controller';
import { CloudflareService } from 'src/cloudflare/cloudflare.service';

@Module({
  controllers: [AnalyzeController],
  providers: [AnalyzeService, CloudflareService],
})
export class AnalyzeModule {}
