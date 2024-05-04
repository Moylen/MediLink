import { RecordStatusEnum } from '../../common/enums/record-status.enum';
import { IsDateString, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCareRecordDto {
  @ApiProperty({ example: '2024-04-30 10:00:00', description: 'Время записи' })
  @IsNotEmpty()
  @IsDateString()
  dateOfRecord: Date;

  @ApiProperty({ example: RecordStatusEnum.Planned, description: 'Статус записи' })
  @IsNotEmpty()
  @IsEnum(RecordStatusEnum)
  status: RecordStatusEnum;

  @ApiProperty({ example: 1, description: 'ID пациента' })
  @IsNotEmpty()
  @IsNumber()
  patientId: number;

  @ApiProperty({ example: 1, description: 'ID услуги' })
  @IsNotEmpty()
  @IsNumber()
  careId: number;
}