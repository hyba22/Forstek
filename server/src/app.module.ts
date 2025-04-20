import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import User from './users/user.entity';
import { UsersModule } from './users/users.module';
import { OffresModule } from './offres/offres.module';
import { Offre } from './offres/offre.entity';
import { ConfigModule } from '@nestjs/config';
import Demande from './stagiaire/demande.entity';
import { StagiaireModule } from './stagiaire/stagiaire.module';
import { DemandeModule } from './demande/demande.module';
import { EvaluationModule } from './evaluation/evaluation.module';
import { DeposeprojetModule } from './deposeprojet/deposeprojet.module';
import { ProjetFreelance } from './projetFreelance/projetFreelance.entity';
import { ProjetFreelanceModule } from './projetFreelance/projet-freelance.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Demande, ProjetFreelance],
      autoLoadEntities: true,
      synchronize: true, 
    }),
    AuthModule,
    UsersModule,
    StagiaireModule,
    OffresModule,
    EvaluationModule,
    DemandeModule,
    DeposeprojetModule,
    ProjetFreelanceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}