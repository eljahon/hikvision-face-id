import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { UserEntity } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationResult } from 'src/commons/paginations';
// import { AuthRegisterDto } from '../auth/dto/auth.registor.dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepasitory: Repository<UserEntity>,
  ) {}

  async findAll(query): Promise<PaginationResult<UserEntity>> {
    const { page, pageSize } = query;
    const [data, total] = await this.getPaginatedItemsFromDatabase(
      page,
      pageSize,
    );
    const pageCount = Math.ceil(total / pageSize);

    const result: PaginationResult<UserEntity> = {
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

  async findById(id: string): Promise<UserEntity> {
    try {
      const userItem = await this.userRepasitory.findOne({ where: { id } });
      if (!userItem) throw new BadGatewayException('user not found');
      return userItem;
    } catch (err) {
      throw new BadGatewayException(err.message);
    }
  }

  async update(id: string, data: UserDto): Promise<UserEntity> {
    await this.findById(id);
    await this.userRepasitory.update(id, data as unknown as UserEntity);
    return await this.findById(id);
  }

  async create(data: UserDto): Promise<UserEntity> {
    try {
      const itemUser = await this.userRepasitory.create(
        data as unknown as UserEntity,
      );
      const itemdata = await this.userRepasitory.save(itemUser);
      return itemdata;
    } catch (error) {
      throw new BadGatewayException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const itemdata = await this.userRepasitory.findOne({ where: { id } });
      if (!itemdata) throw new BadRequestException('user not found by id');
      await this.userRepasitory.delete(id);
      return itemdata;
    } catch (error) {
      throw new BadGatewayException(error.message);
    }
  }
  async findByEmployeeNoString({
    employeeNoString,
  }: {
    employeeNoString: number;
  }) {
    const itemUser = await this.userRepasitory.findOne({
      where: { employeeNoString },
    });
    if (itemUser) return true;
    return false;
  }
  async getPaginatedItemsFromDatabase(
    page: number,
    pageSize: number,
  ): Promise<[UserEntity[], number]> {
    const items = await this.userRepasitory.find({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    const total = await this.userRepasitory.count();

    return [items, total];
  }
}
