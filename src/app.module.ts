import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import User from './users/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root', 
      database: 'gestion_users_db',
      entities: [User],
      autoLoadEntities: true,
      synchronize:true,
    }),
    AuthModule,
    UsersModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}