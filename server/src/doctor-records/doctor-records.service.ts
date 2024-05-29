import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorRecord } from './doctor-record.entity';
import { Repository } from 'typeorm';
import { CreateDoctorRecordDto } from './dto/create-doctor-record.dto';
import { UpdateDoctorRecordDto } from './dto/update-doctor-record.dto';
import { Timetable } from './timetables/timetable.entity';

@Injectable()
export class DoctorRecordsService {
  constructor(
    @InjectRepository(DoctorRecord)
    private doctorRecordRepository: Repository<DoctorRecord>,
    @InjectRepository(Timetable)
    private timetableRepository: Repository<Timetable>,
  ) {
  }

  async createDoctorRecord(dto: CreateDoctorRecordDto) {
    const conflictRecord = await this.doctorRecordRepository.findOne({
      where: {
        timetable: { id: dto.timetableId },
      },
    });

    if (conflictRecord) {
      throw new BadRequestException('Doctor record for this timetable already exists');
    }

    const time = await this.timetableRepository.findOneBy({ id: dto.timetableId });
    time.isFree = false;
    await this.timetableRepository.save(time);

    const record = await this.doctorRecordRepository.save({
      status: dto.status,
      patient: { id: dto.patientId },
      timetable: { id: dto.timetableId },
    });
    return await this.doctorRecordRepository.findOneBy({ id: record.id });
  }

  async getDoctorRecordById(id: number) {
    const record = await this.doctorRecordRepository.findOneBy({ id });
    if (!record) {
      throw new NotFoundException('Doctor record not found');
    }
    return record;
  }

  async updateDoctorRecordById(id: number, dto: UpdateDoctorRecordDto) {
    const record = await this.doctorRecordRepository.findOneBy({ id });
    if (!record) {
      throw new NotFoundException('Doctor record not found');
    }
    Object.assign(record, dto);
    return await this.doctorRecordRepository.save(record);
  }
}
