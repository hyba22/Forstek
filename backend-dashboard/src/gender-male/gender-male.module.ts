import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenderMale } from './entities/gender-male.entity';
import { GenderMaleController } from './gender-male.controller';
import { GenderMaleService } from './gender-male.service';

@Module({
  imports: [TypeOrmModule.forFeature([GenderMale])],
  controllers: [GenderMaleController],
  providers: [GenderMaleService],
  exports: [GenderMaleService],
})
export class GenderMaleModule {}