import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseInterceptors,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PaginationDto, PaginationResult } from 'src/commons/paginations';
import { NotificationEntity } from './notification.entity';
import { ApiTags } from '@nestjs/swagger';
import { NotificationService } from './notification.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import * as dayjs from 'dayjs';

@Controller('notification')
@ApiTags('notification')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}
  @Get()
  async findAll(
    @Query() query: PaginationDto,
  ): Promise<PaginationResult<NotificationEntity>> {
    return await this.notificationService.findAll(query);
  }

  //   @Get(':id')
  // async findOne(id:string) {
  //   return await this.notificationService.findOne(id)
  // }
  @Post('/in')
  @UseInterceptors(AnyFilesInterceptor())
  @HttpCode(HttpStatus.OK)
  async createNotificationIn(@Body() data: any): Promise<any> {
    // console.log(JSON.parse(JSON.stringify(data.event_log)), '===>>>> data body')
    const req = JSON.parse(data.event_log);
      // console.log(req, '===>>>> data.event_log');
    // return 'ok';


      // console.log(req?.AccessControllerEvent, '===>>>> currentVerifyMode');

    if (
      req &&
      req.AccessControllerEvent &&
      req?.AccessControllerEvent?.currentVerifyMode !== 'invalid'
    ) {
   return await this.notificationService.createIn(req,dayjs(req.dateTime).format('YYYY-MM-DD HH:mm:ss'));
    
    }
    // console.log(req, '===>>>> req.headers')

  }
  @Post('/out')
   @UseInterceptors(AnyFilesInterceptor())
  @HttpCode(HttpStatus.OK)
  async createNotificationOut(@Body() data: any): Promise<any> {
    const req = JSON.parse(data.event_log);

    if (
      req &&
      req.AccessControllerEvent &&
      req?.AccessControllerEvent?.currentVerifyMode !== 'invalid'
    ) {
   return await this.notificationService.createOut(req,dayjs(req.dateTime).format('YYYY-MM-DD HH:mm:ss'));
    
    }
    //   console.log(JSON.parse(JSON.stringify(data.event_log)), '===>>>> data body')
    //   const req = JSON.parse(JSON.stringify(data.event_log))
    //   if(req.AccessControllerEvent.currentVerifyMode !=='invalid') console.log('===>>>> items in',data);
    // console.log(req, '===>>>> req.headers')
    //   return 'ok'
  }
  // @Delete(':id')
  // @UseGuards(AuthGuard)
  // @ApiBearerAuth()
  // async remove (@Param('id') id:string):Promise<DeleteResult> {
  //   return await this.notificationService.remove(id)
  // }

  // @Put(':id')
  // @UseGuards(AuthGuard)
  // @ApiBearerAuth()
  // async update(@Param('id') id:string, @Body() data:AboutDto):Promise<UpdateResult> {
  //  return await this.notificationService.update(id, data)
  // }
}
