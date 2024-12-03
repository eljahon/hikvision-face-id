import { Body, Controller, Get, HttpCode } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Cron } from '@nestjs/schedule';
import { HikvisionUserAddService } from './hikvision-user-add.service';
// import { HikvisionUserAddService } from './hikvision-user-add.service';
// import { UsersService } from '../users/users.service';

@Controller('hikvision-user-add')
@ApiTags('hikvision-user-add')
export class HikvisionUserAddController {
  constructor(
    private readonly hikvisionUserAddService: HikvisionUserAddService,
  ) {}
  @Get()
  // @Cron('45 * * * * *')
  // @HttpCode(200)
  async findAll() {
    const data = await this.hikvisionUserAddService.fetchData();
    console.log(data);
    for await (const item of data.object) {
      const _data = {
        ...item,
        employeeNoString: item.id,
      };
      delete _data.id;

      const user = await this.hikvisionUserAddService.userCreateInline(_data);
      console.log(user, 'User created inline');
    }
  }

  // @Post()
  // async create(@Body() body: any) {
  //     return await this.hikvisionUserAddService.create(body);
  // }
  // @Put(':id')
  // async update(@Param('id') id: string, @Body() body: any) {
  //     return await this.hikvisionUserAddService.update(id, body);
  // }
  // @Delete(':id')
  // async delete(@Param('id') id: string) {
  //     return await this.hikvisionUserAddService.delete(id);
}
