import { RecordStatusEnum } from '../../common/enums/record-status.enum';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDoctorRecordDto {
  @ApiProperty({ example: 1, description: 'ID пациента' })
  @IsNumber()
  @IsNotEmpty()
  patientId: number;

  @ApiProperty({ example: 1, description: 'ID времени для записи' })
  @IsNumber()
  @IsNotEmpty()
  timetableId: number;

  @ApiProperty({ example: RecordStatusEnum.Planned, description: 'Статус записи' })
  @IsEnum(RecordStatusEnum)
  @IsNotEmpty()
  status: RecordStatusEnum;
}