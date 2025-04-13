// src/market-share/market-share.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarketShare } from './entities/market-share.entity';
import { MarketShareController } from './market-share.controller';
import { MarketShareService } from './market-share.service';

@Module({
  imports: [TypeOrmModule.forFeature([MarketShare])],
  controllers: [MarketShareController],
  providers: [MarketShareService],
})
export class MarketShareModule {}