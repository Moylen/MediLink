import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CareRecord } from '../../entities/care-record.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class CareResult {
  @ApiProperty({ example: 1, description: 'ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Какой-то комментарий', description: 'Комментарий' })
  @Column({ nullable: false })
  comment: string;

  @ApiProperty({ example: 'path/to/file', description: 'Путь до файла' })
  @Column({ nullable: false })
  file: string;

  @ApiProperty({ example: '2024-05-04 10:00:00', description: 'Дата создания' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ApiProperty({ example: '2024-05-04 11:00:00', description: 'Дата обновления' })
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(
    () => CareRecord,
    careRecord => careRecord.careResult,
    { cascade: true })
  @JoinColumn()
  careRecord: CareRecord;
}