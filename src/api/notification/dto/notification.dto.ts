

import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsEnum, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { EventsType } from 'src/enams';
import { ILANG } from "src/iterfaces";

 class NotificationDto {
    @IsString()
    @IsNotEmpty({message: 'bg_image shuould not be provided'})
    @ApiProperty()
    bg_image: string


        @IsString()
        @IsNotEmpty()
        @ApiProperty({example:'17.03.2024'})
        date: string
 


    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: 'image url'})
    secondary_image: string


        
}

    export default NotificationDto