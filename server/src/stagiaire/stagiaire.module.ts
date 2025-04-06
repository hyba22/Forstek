import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StagiaireService } from './stagiaire.service';
import { StagiaireController } from './stagiaire.controller';
import Demande from './demande.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Demande]), UsersModule],
  providers: [StagiaireService],
  controllers: [StagiaireController],
})
export class StagiaireModule {}