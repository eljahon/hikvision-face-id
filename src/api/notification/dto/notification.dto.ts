import { Optional } from '@nestjs/common';

class NotificationDto {
  @Optional()
  employeeNoString: string;

  @Optional()
  name: string;

  @Optional()
  dateTime: string;

  @Optional()
  majorEventType: string;

  // @IsString()
  // @IsNotEmpty({ message: 'bg_image shuould not be provided' })
  // @ApiProperty()
  // bg_image: string;

  // @IsString()
  // @IsNotEmpty()
  // @ApiProperty({ example: '17.03.2024' })
  // date: string;

  // @IsString()
  // @IsNotEmpty()
  // @ApiProperty({ example: 'image url' })
  // secondary_image: string;
}

export default NotificationDto;
