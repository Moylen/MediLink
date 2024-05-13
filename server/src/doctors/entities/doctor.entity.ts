import { Speciality } from './speciality.entity';
import { Department } from '../departments/department.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Doctor {
  @ApiProperty({ example: 1, description: 'ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'test@mail.ru', description: 'Почта' })
  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false, select: false })
  password: string;

  @ApiProperty({ example: 'doctor', description: 'Роль' })
  @Column({ nullable: false, default: 'doctor' })
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

  @ApiProperty({ example: 6, description: 'Стаж работы' })
  @Column({ nullable: false })
  experience: number;

  @ApiProperty({ example: '2000-04-13', description: 'Дата рождения' })
  @Column({ type: 'date', nullable: true, default: null })
  birthday: Date;

  @ApiProperty({ example: '2000-04-13', description: 'Дата создания' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ApiProperty({ type: () => Speciality })
  @ManyToOne(() => Speciality, speciality => speciality.doctors)
  speciality: Speciality;

  @ManyToOne(() => Department, department => department.doctors)
  department: Department;

}