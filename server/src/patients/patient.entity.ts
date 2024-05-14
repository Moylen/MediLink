import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { CareRecord } from '../care-records/care-record.entity';
import { DoctorRecord } from '../doctor-records/doctor-record.entity';

@Entity()
export class Patient {
  @ApiProperty({ example: 1, description: 'ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'test@mail.ru', description: 'Почта' })
  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false, select: false })
  password: string;

  @ApiProperty({ example: 'patient', description: 'Роль' })
  @Column({ nullable: false, default: 'patient' })
  role: string;

  @ApiProperty({ example: 'Name', description: 'Имя' })
  @Column({ nullable: false })
  firstName: string;

  @ApiProperty({ example: 'LastName', description: 'Фамилия' })
  @Column({ nullable: false })
  lastName: string;

  @ApiProperty({ example: '+79001112233', description: 'Телефон' })
  @Column({ nullable: false })
  phoneNumber: string;

  @ApiProperty({ example: '2024-05-13T05:21:47.263Z', description: 'Дата рождения' })
  @Column({ type: 'date', nullable: true, default: null })
  birthday: Date;

  @ApiProperty({ example: '2024-05-13T05:21:47.263Z', description: 'Дата создания' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => CareRecord, careRecord => careRecord.patient)
  careRecords: CareRecord[]

  @OneToMany(() => DoctorRecord, doctorRecords => doctorRecords.patient)
  doctorRecords: DoctorRecord[];
}
