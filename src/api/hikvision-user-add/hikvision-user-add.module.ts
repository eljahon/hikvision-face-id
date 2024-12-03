import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HikvisionUserAddController } from './hikvision-user-add.controller';
import { HikvisionUserAddService } from './hikvision-user-add.service';
import { UsersModule } from '../users/users.module';
import { HikvisionUserAddEntity } from './hikvision-user-add.entity';
import { AuthService } from './auth.service';

@Module({
    imports: [TypeOrmModule.forFeature([HikvisionUserAddEntity]), UsersModule],
    controllers: [HikvisionUserAddController],
    providers: [HikvisionUserAddService, AuthService],
    // exports: [HikvisionUserAddService]
})
export class HikvisionUserAddModule {}
