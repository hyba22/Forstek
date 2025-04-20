import { Module } from '@nestjs/common';
import { ProjetFreelanceController } from './projet-freelance.controller';
import { ProjetFreelanceService } from './projet-freelance.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjetFreelance } from './projetFreelance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjetFreelance])],
  controllers: [ProjetFreelanceController],
  providers: [ProjetFreelanceService],
  exports: [ProjetFreelanceService],
})
export class ProjetFreelanceModule {}
