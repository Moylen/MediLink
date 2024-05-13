import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RecordStatusEnum } from '../common/enums/record-status.enum';
import { Patient } from '../patients/patient.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Care } from './cares/care.entity';
import { CareResult } from './care-result/care-result.entity';

@Entity()
export class CareRecord {
  @ApiProperty({ example: 1, description: 'ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: '2024-04-30 10:00:00', description: 'Дата записи' })
  @Column({ type: 'timestamp', nullable: false })
  dateOfRecord: Date;

  @ApiProperty({ example: RecordStatusEnum.Planned, description: 'Статус записи' })
  @Column({ type: 'enum', enum: RecordStatusEnum, default: RecordStatusEnum.Planned, nullable: false })
  status: RecordStatusEnum;

  @ApiProperty({ type: () => Patient })
  @ManyToOne(
    () => Patient,
    patient => patient.careRecords,
    { nullable: false, cascade: true, eager: true },
  )
  patient: Patient;

  @ApiProperty({ type: () => Care })
  @ManyToOne(
    () => Care,
    care => care.careRecords,
    { nullable: false, cascade: true, eager: true },
  )
  care: Care;

  @OneToOne(() => CareResult, careResult => careResult.careRecord)
  careResult: CareResult;

}