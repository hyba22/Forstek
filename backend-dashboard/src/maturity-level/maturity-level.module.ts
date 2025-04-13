import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaturityLevelController } from './maturity-level.controller';
import { MaturityLevelService } from './maturity-level.service';
import { MaturityLevel } from './entities/maturity-level.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MaturityLevel])],
  controllers: [MaturityLevelController],
  providers: [MaturityLevelService],
})
export class MaturityLevelModule {}