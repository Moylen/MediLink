import { Repository } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { CreatePatientDto } from './dto/CreatePatientDto';
export declare class PatientsService {
    private readonly patientRepository;
    constructor(patientRepository: Repository<Patient>);
    createPatient(patient: CreatePatientDto): Promise<Patient>;
    getPatientByEmail(email: string): Promise<Patient>;
}
