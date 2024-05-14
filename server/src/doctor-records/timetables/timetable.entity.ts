import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { DoctorRecord } from '../doctor-record.entity';
import { Doctor } from '../../doctors/entities/doctor.entity';

@Entity()
export class Timetable {
  @ApiProperty({ example: 1, description: 'ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: '2024-05-13T05:21:47.263Z', description: 'Время записи' })
  @Column({ type: 'timestamp', nullable: false })
  time: Date;

  @ApiProperty({ type: () => Doctor })
  @ManyToOne(
    () => Doctor,
    doctor => doctor.timetables,
    { eager: true },
  )
  doctor: Doctor;

  @OneToMany(
    () => DoctorRecord,
    doctorRecords => doctorRecords.timetable,
  )
  doctorRecords: DoctorRecord[];

  @ApiProperty({ example: '2024-05-13T05:21:47.263Z', description: 'Дата создания' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}