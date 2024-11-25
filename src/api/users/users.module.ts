import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserEntity } from './users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from "src/constants";
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), 
  JwtModule.register({
    secret: process.env.JWT_SECRET || jwtConstants.secret,
    signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '1d' },
    global: true,
  }),
],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
