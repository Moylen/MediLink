import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Doctor } from './entities/doctor.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>) {
  }

  async getDoctorByEmail(email: string): Promise<Doctor> {
    return await this.doctorRepository.findOne({
      where: { email: email },
      select: ["id", "email", "password", "role"]
    });
  }
}
