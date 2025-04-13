import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Revenue } from './entities/revenue.entity';
import { RevenueController } from './revenue.controller';
import { RevenueService } from './revenue.service';

@Module({
  imports: [TypeOrmModule.forFeature([Revenue])],
  controllers: [RevenueController],
  providers: [RevenueService],
})
export class RevenueModule {}