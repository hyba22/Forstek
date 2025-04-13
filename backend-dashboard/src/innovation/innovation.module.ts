import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Innovation } from './entities/innovation.entity';
import { InnovationController } from './innovation.controller';
import { InnovationService } from './innovation.service';

@Module({
  imports: [TypeOrmModule.forFeature([Innovation])],
  controllers: [InnovationController],
  providers: [InnovationService],
})
export class InnovationModule {}