import { Column, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { CareRecord } from '../care-record.entity';


@Entity()
export class Care {
  @ApiProperty({ example: 1, description: 'ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Кардиограмма', description: 'Название услуги' })
  @Column({ nullable: false, unique: true })
  name: string;

  @ApiProperty({ example: 'Кардиограмма это круто!', description: 'Описание услуги' })
  @Column({ nullable: false, default: '' })
  description: string;

  @ApiProperty({ example: 1299.99, description: 'Цена услуги' })
  @Column({ type: 'float', nullable: false })
  price: number;

  @ApiProperty({ example: true, description: 'Отображать услугу (да/нет)' })
  @Column({ default: true })
  isActive: boolean;

  @ApiProperty({ example: '2024-05-13T05:21:47.263Z', description: 'Дата создания' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ApiProperty({ example: '2024-05-13T05:21:47.263Z', description: 'Дата изменения' })
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => CareRecord, careRecord => careRecord.care)
  careRecords: CareRecord[];
}