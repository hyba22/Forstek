import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StagiaireController } from './stagiaire.controller';
import { StagiaireService } from './stagiaire.service';
import  Demande  from './demande.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Demande]),
    UsersModule, 
  ],
  controllers: [StagiaireController],
  providers: [StagiaireService],
})
export class StagiaireModule {}