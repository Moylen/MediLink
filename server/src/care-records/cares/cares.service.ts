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
     const service = await this.careRepository.findOneBy({ id: id });
     if (!service) {
       throw new NotFoundException('Medical service not found');
     }
     return service;
  }

  async updateCareById(id: number, dto: UpdateCareDto) {
    const service = await this.careRepository.findOneBy({ id: id });
    if (!service) {
      throw new NotFoundException('Medical service not found');
    }
    Object.assign(service, dto);
    return await this.careRepository.save(service);
  }
}
