import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenderFemale } from './entities/gender-female.entity';
import { GenderFemaleController } from './gender-female.controller';
import { GenderFemaleService } from './gender-female.service';

@Module({
  imports: [TypeOrmModule.forFeature([GenderFemale])],
  controllers: [GenderFemaleController],
  providers: [GenderFemaleService],
  exports: [GenderFemaleService],
})
export class GenderFemaleModule {}