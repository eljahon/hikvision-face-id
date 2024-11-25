import {
    Controller,
    Post,
    UploadedFile,
    UseGuards,
    UseInterceptors,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
  import { diskStorage } from 'multer';
import { AuthGuard } from './guards/auth.guard';
  
  @Controller('upload')
  @ApiTags('upload')
  export class AppController {
     
    @Post()
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
          type: 'object',
          properties: {
            file: {
              type: 'string',
              format: 'binary',
            },
          },
        },
      })
    @UseInterceptors(
      FileInterceptor('file', {
        dest: '../uploads/img',
        storage: diskStorage({
          destination: 'uploads/img',
          filename: (req, file, cb) => {
            const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
            cb(null, randomName+file.originalname);
          },
        }),
      }),
    )
    async local(@UploadedFile() file: Express.Multer.File) {
      return {
        statusCode: 200,
        url: file.path,
      };
    }
  
  }
