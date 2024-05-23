import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDepartmentDto {
  @ApiProperty({ example: 'Хирургия', description: 'Название отделения' })
  @IsNotEmpty()
  @IsString()
  name: string;
}