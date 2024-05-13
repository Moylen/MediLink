import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCareResultDto {
  @ApiProperty({ description: 'Файл', type: 'string', format: 'binary' })
  file: any;

  @ApiProperty({ example: 'Какой-то комментарий', description: 'Комментарий' })
  @IsString()
  @IsNotEmpty()
  comment: string;

  @ApiProperty({ example: 1, description: 'ID записи' })
  @IsString()
  @IsNotEmpty()
  careRecordId: number;
}