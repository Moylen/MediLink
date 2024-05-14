import { IsDateString, IsNotEmpty, IsNumberString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FilterTimetableDto {
  @ApiProperty({ example: '2024-04-30', description: 'Дата для поиска записей' })
  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @ApiProperty({ example: 1, description: 'ID доктора' })
  @IsNotEmpty()
  @IsNumberString()
  doctorId: string;
}