import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Care } from './care.entity';
import { CreateCareDto } from './dto/create-care.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateCareDto } from './dto/update-care.dto';

@Injectable()
export class CaresService {
  constructor(
    @InjectRepository(Care)
    private readonly careRepository: Repository<Care>
  ) {
  }

  async createCare(dto: CreateCareDto) {
    return await this.careRepository.save(dto);
  }

  async getCareById(id: number) {
     const care = await this.careRepository.findOneBy({ id: id });
     if (!care) {
       throw new NotFoundException('Medical care not found');
     }
     return care;
  }

  async getAllCares() {
    const cares = await this.careRepository.find();
    if (cares.length === 0) {
      throw new NotFoundException('Medical cares not found');
    }
    return cares;
  }

  async updateCareById(id: number, dto: UpdateCareDto) {
    const care = await this.careRepository.findOneBy({ id: id });
    if (!care) {
      throw new NotFoundException('Medical care not found');
    }
    Object.assign(care, dto);
    return await this.careRepository.save(care);
  }
}
