import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CareRecord } from './entities/care-record.entity';
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
    return await this.careRecordRepository.save(dto);
  }

  async getCareRecorddById(id: number) {
    const record = await this.careRecordRepository.findOneBy({id: id});
    if (!record){
      throw new NotFoundException('Service record not found');
    }
    return record;
  }

  async updateCareRecordById(id: number, dto: UpdateCareRecordDto) {
    const record = await this.careRecordRepository.findOneBy({id: id});
    if (!record){
      throw new NotFoundException('Service record not found');
    }
    Object.assign(record, dto);
    return await this.careRecordRepository.save(record);
  }
}
