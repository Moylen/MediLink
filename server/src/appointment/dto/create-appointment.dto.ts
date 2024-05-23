import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAppointmentDto {
  @ApiProperty({ example: 'У вас ракушка', description: 'Диагноз' })
  @IsString()
  @IsNotEmpty()
  diagnosis: string;

  @ApiProperty({ example: 'Гига-анамнез', description: 'Анамнез' })
  @IsString()
  @IsNotEmpty()
  anamnesis: string;

  @ApiProperty({ example: 'Рекомендую воздержаться от походов в ИКИТ', description: 'Рекомендации' })
  @IsString()
  @IsNotEmpty()
  recommendations: string;

  @ApiProperty({ example: 'Комментарий', description: 'Комментарий' })
  @IsString()
  @IsOptional()
  comment: string;

  @ApiProperty({ example: 1, description: 'ID записи'})
  @IsNumber()
  @IsNotEmpty()
  doctorRecordId: number;
}