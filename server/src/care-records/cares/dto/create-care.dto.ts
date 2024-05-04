import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateCareDto {
  @ApiProperty({ example: 'Кардиограмма', description: 'Название услуги' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'Кардиограмма это круто!', description: 'Описание услуги' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: 1299.99, description: 'Цена услуги' })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({ example: true, description: 'Отображать услугу (да/нет)' })
  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}