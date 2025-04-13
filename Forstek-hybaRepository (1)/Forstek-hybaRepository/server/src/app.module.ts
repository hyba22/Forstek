import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DemandeModule } from './demande/demande.module';
import { EvaluationModule } from './evaluation/evaluation.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306, 
      username: 'root', 
      password: 'root', 
      database: 'forstek',
      autoLoadEntities: true,
      synchronize: true, 
      extra: {
        insecureAuth: true, 
      },
    }),
    AuthModule,
    UsersModule,
    EvaluationModule,
    DemandeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}