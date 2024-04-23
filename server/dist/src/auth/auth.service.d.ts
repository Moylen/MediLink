import { JwtService } from '@nestjs/jwt';
import { PatientsService } from '../patients/patients.service';
import { CreatePatientDto } from '../patients/dto/CreatePatientDto';
import { LoginDto } from './dto/LoginDto';
import { DoctorsService } from '../doctors/doctors.service';
export declare class AuthService {
    private jwtService;
    private patientService;
    private doctorsService;
    constructor(jwtService: JwtService, patientService: PatientsService, doctorsService: DoctorsService);
    loginPatient(loginDto: LoginDto): Promise<{
        token: string;
    }>;
    loginDoctor(loginDto: LoginDto): Promise<{
        token: string;
    }>;
    registerPatient(createPatientDto: CreatePatientDto): Promise<{
        token: string;
    }>;
    private generateToken;
    private validatePatient;
    private validateDoctor;
}
