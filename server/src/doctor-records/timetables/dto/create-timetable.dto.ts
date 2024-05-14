import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTimetableDto {
  @ApiProperty({ example: '2024-04-30 10:00:00', description: 'Время записи' })
  @IsNotEmpty()
  @IsDateString()
  time: Date;

  @ApiProperty({ example: 1, description: 'ID доктора' })
  @IsNotEmpty()
  @IsNumber()
  doctorId: number;
}