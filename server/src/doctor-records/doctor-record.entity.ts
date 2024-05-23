import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Patient } from '../patients/patient.entity';
import { Timetable } from './timetables/timetable.entity';
import { RecordStatusEnum } from '../common/enums/record-status.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Appointment } from '../appointment/appointment.entity';

@Entity()
export class DoctorRecord {
  @ApiProperty({ example: 1, description: 'ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => Patient })
  @ManyToOne(
    () => Patient,
    patient => patient.doctorRecords,
    { eager: true, nullable: false },
  )
  patient: Patient;

  @ApiProperty({ type: () => Timetable })
  @ManyToOne(
    () => Timetable,
    timetable => timetable.doctorRecords,
    { eager: true, nullable: false },
  )
  timetable: Timetable;

  @OneToOne(
    () => Appointment,
    appointment => appointment.doctorRecord
  )
  appointment: Appointment;

  @ApiProperty({ example: 'planned', description: 'Статус записи' })
  @Column({ type: 'enum', enum: RecordStatusEnum, default: RecordStatusEnum.Planned })
  status: RecordStatusEnum;

  @ApiProperty({ example: '2024-05-13T05:21:47.263Z', description: 'Дата создания' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}