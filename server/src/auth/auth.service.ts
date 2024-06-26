import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PatientsService } from '../patients/patients.service';
import { CreatePatientDto } from '../patients/dto/create-patient.dto';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { DoctorsService } from '../doctors/doctors.service';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService,
              private patientService: PatientsService,
              private doctorsService: DoctorsService) {
  }

  async loginPatient(loginDto: LoginDto) {
    const patient = await this.validatePatient(loginDto);
    return this.generateToken(patient.id, patient.email, patient.role);
  }

  async loginDoctor(loginDto: LoginDto) {
    const doctor = await this.validateDoctor(loginDto);
    return this.generateToken(doctor.id, doctor.email, doctor.role);
  }

  async registerPatient(createPatientDto: CreatePatientDto) {
    const candidate = await this.patientService.getPatientByEmail(createPatientDto.email);
    if (candidate) {
      throw new HttpException('Patient already exists!', HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bcrypt.hash(createPatientDto.password, 5);
    const patient = await this.patientService.createPatient(
      { ...createPatientDto, password: hashPassword },
    );
    return this.generateToken(patient.id, patient.email, patient.role);
  }

  validateToken(token: string) {
    return this.jwtService.verify(token);
  }

  private async generateToken(id: number, email: string, role: string) {
    const payload = { id: id, email: email, role: role };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validatePatient(loginDto: LoginDto) {
    const patient = await this.patientService.getPatientByEmail(loginDto.email);
    if (!patient) {
      throw new UnauthorizedException('Wrong email or password');
    }
    const passwordEquals = await bcrypt.compare(loginDto.password, patient.password);
    if (!passwordEquals) {
      throw new UnauthorizedException('Wrong email or password');
    }
    return patient;
  }

  private async validateDoctor(loginDto: LoginDto) {
    try {
      const doctor = await this.doctorsService.getDoctorByEmail(loginDto.email);
      const passwordEquals = await bcrypt.compare(loginDto.password, doctor.password);
      if (doctor && passwordEquals) {
        return doctor;
      }
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException('Wrong email or password');
    }
  }


}
