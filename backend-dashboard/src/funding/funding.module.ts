// src/funding/funding.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Funding } from './entities/funding.entity';
import { FundingController } from './funding.controller';
import { FundingService } from './funding.service';

@Module({
  imports: [TypeOrmModule.forFeature([Funding])],
  controllers: [FundingController],
  providers: [FundingService],
})
export class FundingModule {}