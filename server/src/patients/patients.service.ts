import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
import { PatientDto } from './dto/patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {
  }

  async createPatient(patient: CreatePatientDto): Promise<Patient> {
    return await this.patientRepository.save(patient);
  }

  async getPatientByEmail(email: string): Promise<Patient> {
    return await this.patientRepository.findOneBy({ email: email });
  }

  async getPatientById(id: number): Promise<PatientDto> {
    const patient = await this.patientRepository.findOneBy({ id: id });
    if (!patient) {
      throw new NotFoundException('Patient not found');
    }
    return patient;
  }

  async getAllPatients(): Promise<PatientDto[]> {
    return await this.patientRepository.find();
  }

  async updatePatientById(id: number, updatePatientDto: UpdatePatientDto): Promise<PatientDto> {
    let patient = await this.patientRepository.findOneBy({ id: id });
    if (!patient) {
      throw new NotFoundException('Patient not found');
    }
    Object.assign(patient, updatePatientDto);
    return await this.patientRepository.save(patient);
  }
}
