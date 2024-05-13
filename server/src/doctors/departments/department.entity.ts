import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Doctor } from '../entities/doctor.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Department {
  @ApiProperty({ example: 1, description: 'ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Хирургия', description: 'Название отделения' })
  @Column({ nullable: false, unique: true })
  name: string;

  @OneToMany(() => Doctor,
    doctor => doctor.department,
    { eager: true },
  )
  doctors: Doctor[];
}