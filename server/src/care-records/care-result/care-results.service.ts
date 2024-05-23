import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CareResult } from './care-result.entity';
import { CreateCareResultDto } from './dto/create-care-result.dto';
import { FilesService } from '../../files/files.service';
import { CareRecord } from '../care-record.entity';


@Injectable()
export class CareResultsService {
  constructor(
    @InjectRepository(CareResult)
    private careResultRepository: Repository<CareResult>,
    @InjectRepository(CareRecord)
    private careRecordRepository: Repository<CareRecord>,
    private filesService: FilesService,
  ) {
  }

  async createCareResult(dto: CreateCareResultDto, file: any) {
    const conflictResult = await this.careResultRepository.findOne({
      where: { careRecord: { id: Number(dto.careRecordId) } },
    });

    if (conflictResult) {
      throw new BadRequestException('Care result for this record already exists');
    }

    const fileName = await this.filesService.createFile(file);
    const record = await this.careRecordRepository.findOne({
      where: { id: Number(dto.careRecordId) },
    });
    return await this.careResultRepository.save({
      comment: dto.comment,
      careRecord: record,
      file: fileName,
    });
  }

  async getCareResultById(id: number) {
    const result = await this.careResultRepository.findOne({
      where: { id },
    });

    if (!result) {
      throw new NotFoundException('Care result not found');
    }

    return result;
  }

  async getCareResultsByPatientId(id: number) {
    const results = await this.careResultRepository.find({
      where: {
        careRecord:
          { patient: { id } },
      },
    });

    if (results.length === 0) {
      throw new NotFoundException('Care results not found');
    }

    return results;
  }
}
