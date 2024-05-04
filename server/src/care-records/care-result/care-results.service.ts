import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CareResult } from './entities/care-result.entity';
import { CreateCareResultDto } from './dto/create-care-result.dto';


@Injectable()
export class CareResultsService {
  constructor(
    @InjectRepository(CareResult)
    private careRecordRepository: Repository<CareResult>,
  ) {
  }

  async createRecord(dto: CreateCareResultDto, image: any) {
    // const fileName = (Сделать модуль для работы с файлами)
    // const record = await this.careRecordRepository.save({...dto, file: fileName})
    // return record;
  }

  async getCareResultById(id: number) {
    return await this.careRecordRepository.findOneBy({ id: id });
  }
}
