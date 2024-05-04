import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { CareRecord } from '../../care-records/entities/care-record.entity';

@Entity()
export class Patient {
  @ApiProperty({ example: 1, description: 'ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'test@mail.ru', description: 'Почта' })
  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
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

  @ApiProperty({ example: '2000-04-13', description: 'Дата рождения' })
  @Column({ type: 'date', nullable: true, default: null })
  birthday: Date;

  @ApiProperty({ example: '2000-04-13', description: 'Дата создания' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => CareRecord, careRecord => careRecord.patient)
  careRecords: CareRecord[];
}
