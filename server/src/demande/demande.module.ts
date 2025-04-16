import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DemandeController } from './demande.controller';
import { Demande } from './demande.entity';
import { DemandeService } from './demande.service';

@Module({
  imports: [TypeOrmModule.forFeature([Demande])],
  controllers: [DemandeController],
  providers: [DemandeService],
  exports: [DemandeService],
})
export class DemandeModule {}