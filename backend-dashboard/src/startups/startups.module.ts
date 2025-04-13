import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Startup } from './entities/startup.entity';
import { StartupsController } from './startups.controller';
import { StartupsService } from './startups.service';

@Module({
  imports: [TypeOrmModule.forFeature([Startup])],
  controllers: [StartupsController],
  providers: [StartupsService],
})
export class StartupsModule {}