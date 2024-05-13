import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Doctor } from './doctor.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Speciality {
  @ApiProperty({ example: 1, description: 'ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Хирург', description: 'Специальность' })
  @Column({ nullable: false, unique: true })
  name: string;

  @OneToMany(() => Doctor, doctor => doctor.speciality)
  doctors: Doctor[];
}