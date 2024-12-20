import { query } from 'express';
import { BadGatewayException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationEntity } from './notification.entity';
import { Repository } from 'typeorm';
import { PaginationDto, PaginationResult } from 'src/commons/paginations';
import NotificationDto from './dto/notification.dto';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(NotificationEntity)
    private readonly notificationRepository: Repository<NotificationEntity>,
  ) {}
  async findAll(
    query: PaginationDto,
  ): Promise<PaginationResult<NotificationEntity>> {
    const { page, pageSize } = query;
    const [data, total] = await this.getPaginatedItemsFromDatabase(
      page,
      pageSize,
    );
    
    const pageCount = Math.ceil(total / pageSize);

    const result: PaginationResult<NotificationEntity> = {
      data,
      meta: {
        page,
        pageSize,
        pageCount,
        total,
      },
    };
    return result;
  }

  // async findOne(id: string): Promise<NotificationEntity> {
  //     if (!id) throw new BadGatewayException('id is require to path sub_url/:id')
  //     const item = await this.notificationRepository.findOne({ where: { id } })
  //     if (!item) throw new BadGatewayException('item notification not found')
  //     return item
  // }

  async create(req: any, dateTime: string): Promise<NotificationEntity> {
    const { employeeNoString, name, majorEventType } =
      req.AccessControllerEvent;

    const item = this.notificationRepository.create({
      employeeNoString,
      name,
      majorEventType,
      dateTime,
    });
    // console.log(dateTime, req.dateTime);
    console.log('item ==========>>>', item);
    return await this.notificationRepository.save(item);
  }

  // async update(id:string,data:NotificationDto): Promise<UpdateResult> {
  //     return await this.notificationRepository.createQueryBuilder().update().set({...data}).where({id}).execute()
  // }
  //  async remove (id:string): Promise<DeleteResult> {
  //     return await this.notificationRepository.delete(id)
  //  }
  async getPaginatedItemsFromDatabase(
    page: number,
    pageSize: number,
  ): Promise<[NotificationEntity[], number]> {
    const items = await this.notificationRepository.find({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    const total = await this.notificationRepository.count();

    return [items, total];
  }
}
