
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Parents } from '../types';
export class UserDto {

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'CHILD' })
  type: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Eljahon' })
  name: string; 

   @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 1 })
  employeeNoString: number;

   @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'CREATED' })
  status: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'https://example.com/image.jpg' })
  image_link: string; 
  
  // @IsOptional()
  // @IsArray()
  // @ApiProperty({ example: [] })
  // parents: Parents[];

}
