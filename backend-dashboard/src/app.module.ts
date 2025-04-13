import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as cors from 'cors';
import { ActivityModule } from './activity/activity.module';
import { Activity } from './activity/entities/activity.entity';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entities/user.entity';
import { Funding } from './funding/entities/funding.entity';
import { FundingModule } from './funding/funding.module';
import { GenderFemale } from './gender-female/entities/gender-female.entity';
import { GenderFemaleModule } from './gender-female/gender-female.module';
import { GenderMale } from './gender-male/entities/gender-male.entity';
import { GenderMaleModule } from './gender-male/gender-male.module';
import { Innovation } from './innovation/entities/innovation.entity';
import { InnovationModule } from './innovation/innovation.module';
import { Label } from './labels/entities/label.entity';
import { LabelsModule } from './labels/labels.module';
import { MarketShare } from './market-share/entities/market-share.entity';
import { MarketShareModule } from './market-share/market-share.module';
import { MaturityLevel } from './maturity-level/entities/maturity-level.entity';
import { MaturityLevelModule } from './maturity-level/maturity-level.module';
import { Revenue } from './revenue/entities/revenue.entity';
import { RevenueModule } from './revenue/revenue.module';
import { Startup } from './startups/entities/startup.entity';
import { StartupsModule } from './startups/startups.module';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'dashboard',
      entities: [Label , Funding, Revenue, MarketShare, Startup, GenderFemale, GenderMale,Activity, Innovation,MaturityLevel,User],
      synchronize: true,
    }),
    LabelsModule,
    FundingModule,
    RevenueModule,
    MarketShareModule,
    StartupsModule,
    GenderFemaleModule,
    GenderMaleModule,
    ActivityModule,
    InnovationModule,
    MaturityLevelModule,
    AuthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cors({
          origin: 'http://localhost:3000', 
          methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
          credentials: true, 
        })
      )
      .forRoutes('*'); // Applique à toutes les routes
  }
}