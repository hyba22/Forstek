import { Module } from '@nestjs/common';
import { OffreService } from './offre.service';
import { OffresController } from './offre.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Offre } from './offre.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Offre])],
  controllers: [OffresController],
  providers: [OffreService],
})
export class OffresModule {
}
