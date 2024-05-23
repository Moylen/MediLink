import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DoctorRecord } from '../doctor-records/doctor-record.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Appointment {
  @ApiProperty({ example: 1, description: 'ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'У вас ракушка', description: 'Диагноз' })
  @Column({ nullable: false })
  diagnosis: string;

  @ApiProperty({ example: 'Гига-анамнез', description: 'Анамнез' })
  @Column({ nullable: false })
  anamnesis: string;

  @ApiProperty({ example: 'Рекомендую воздержаться от походов в ИКИТ', description: 'Рекомендации' })
  @Column({ nullable: false })
  recommendations: string;

  @ApiProperty({ example: 'Комментарий', description: 'Комментарий' })
  @Column({ nullable: false })
  comment: string;

  @ApiProperty({ type: () => DoctorRecord })
  @OneToOne(
    () => DoctorRecord,
    { cascade: true, eager: true, nullable: false },
  )
  @JoinColumn()
  doctorRecord: DoctorRecord;
}