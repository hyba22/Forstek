import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import User from './users/user.entity';
import { UsersModule } from './users/users.module';
import { OffresModule } from './offres/offres.module';
import { OffreController } from './offres/offre.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'forstek',
      entities: [User],
      autoLoadEntities: true,
      synchronize:true,
    }),
    AuthModule,
    UsersModule,
    OffresModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}