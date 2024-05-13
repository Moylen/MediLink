import { Speciality } from './speciality.entity';
import { Department } from '../departments/department.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false, select: false })
  password: string;

  @Column({ nullable: false, default: 'doctor' })
  role: string;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: false })
  phoneNumber: string;

  @Column({ nullable: false })
  experience: number;

  @Column({ type: 'date', nullable: true, default: null })
  birthday: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => Speciality, speciality => speciality.doctors)
  speciality: Speciality;

  @ManyToOne(() => Department, department => department.doctors)
  department: Department;

}