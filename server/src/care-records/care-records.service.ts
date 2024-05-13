import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CareRecord } from './care-record.entity';
import { CreateCareRecordDto } from './dto/create-care-record.dto';
import { UpdateCareRecordDto } from './dto/update-care-record.dto';

@Injectable()
export class CareRecordsService {
  constructor(
    @InjectRepository(CareRecord)
    private careRecordRepository: Repository<CareRecord>,
  ) {
  }

  async createCareRecord(dto: CreateCareRecordDto) {
    const newRecord = await this.careRecordRepository.save({
      status: dto.status,
      dateOfRecord: dto.dateOfRecord,
      patient: { id: dto.patientId },
      care: { id: dto.careId },
    });
    return await this.careRecordRepository.findOneBy({ id: newRecord.id });
  }

  async getCareRecordById(id: number) {
    const record = await this.careRecordRepository.findOne({
      where: { id },
    });
    if (!record) {
      throw new NotFoundException('Service record not found');
    }
    return record;
  }

  async getCareRecordsByPatientId(id: number) {
    const records = await this.careRecordRepository.find({
      where: { patient: { id } },
    });

    if (records.length === 0) {
      throw new NotFoundException('Care records not found');
    }

    return records;
  }

  async updateCareRecordById(id: number, dto: UpdateCareRecordDto) {
    const record = await this.careRecordRepository.findOneBy({ id });
    if (!record) {
      throw new NotFoundException('Service record not found');
    }
    Object.assign(record, dto);
    return await this.careRecordRepository.save(record);
  }
}
