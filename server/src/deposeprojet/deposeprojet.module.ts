import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Deposeprojet } from './deposeprojet.entity';
import { DeposeprojetService } from './deposeprojet.service';
import { DeposeprojetController } from './deposeprojet.controller';



@Module({
    imports: [TypeOrmModule.forFeature([Deposeprojet])],
    controllers: [DeposeprojetController],
    providers: [DeposeprojetService],
   
})
export class DeposeprojetModule {}
