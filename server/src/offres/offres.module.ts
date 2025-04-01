import { Module } from '@nestjs/common';
import { OffreService } from './offre.service';

@Module({
  providers: [OffreService]
})
export class OffresModule {}
