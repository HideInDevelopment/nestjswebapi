import { DatabaseModule } from './database/database.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ZoneController } from './zone/zone.controller';
import { ZoneModule } from './zone/zone.module';
import * as dotenv from 'dotenv';
import { ZoneService } from './zone/zone.service';
import { StoreModule } from './store/store.module';
import { WorkerModule } from './worker/worker.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';

//Create own .env file in each case to implement own database configuration and stuff
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/migrations/*{.ts, .js}'],
      synchronize: true,
    }),
    DatabaseModule,
    AuthModule,
    ZoneModule,
    StoreModule,
    WorkerModule,
    CategoryModule,
    ProductModule,
  ],
  controllers: [AppController, ZoneController],
  providers: [AppService, ZoneService],
})
export class AppModule {}
