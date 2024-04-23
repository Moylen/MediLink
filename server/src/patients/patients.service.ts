import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { CreatePatientDto } from './dto/CreatePatientDto';


@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {}

  async createPatient(patient: CreatePatientDto): Promise<Patient> {
    return await this.patientRepository.save(patient);
  }

  async getPatientByEmail(email: string): Promise<Patient> {
    return await this.patientRepository.findOneBy({email: email});
  }
}
