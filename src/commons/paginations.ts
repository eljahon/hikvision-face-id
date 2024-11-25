import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { SortOrder } from '../enams';

export class PaginationDto {
  @Transform(({ value }) => parseInt(value))
  @ApiProperty({
    required: false,
    default: 1,
    description: 'Page number',
  })
  @IsOptional()
  @IsInt({ message: 'Page number must be an integer' })
  @Min(1)
  page: number = 1;

  @Transform(({ value }) => parseInt(value))
  @ApiProperty({
    required: false,
    default: 10,
    description: 'Page size',
  })
  @IsOptional()
  @IsInt({ message: 'Page size must be an integer' })
  @Min(1)
  @Max(100)
  pageSize: number = 10;

  @ApiProperty({
    required: false,
    default: 'id',
    description: 'Order by',
  })
  @IsOptional()
  @IsString({ message: 'Sort by must be a string' })
  orderBy: string = 'id';

  @ApiProperty({
    required: false,
    default: 'ASC',
    description: 'Order direction',
    enum: SortOrder,
  })
  @IsOptional()
  @IsEnum(SortOrder, { message: 'Sort direction must be ASC or DESC' })
  sortBy: SortOrder = SortOrder.ASC;
}

export class PaginationResult<T> {
  data: T[];
  meta: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}
