import { Module } from '@nestjs/common';
// import { AuthModule } from './api/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config/configuration';
import { DatabaseModule } from './database/databse.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UsersModule } from './api/users/users.module';
import { NotificationModule } from './api/notification/notification.module';
import { HikvisionUserAddModule } from './api/hikvision-user-add/hikvision-user-add.module';
import { ScheduleModule } from '@nestjs/schedule';
@Module({
  imports: [
    ScheduleModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../'),
      serveStaticOptions: {
        redirect: false,
        index: false,
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: [`.env.${process.env.NODE_ENV}`],
    }),
    DatabaseModule,
    UsersModule,
    // AuthModule ,
    NotificationModule,
    HikvisionUserAddModule,
    // ProductModule,
  ],
  // controllers: [AppController],
})
export class AppModule {}
