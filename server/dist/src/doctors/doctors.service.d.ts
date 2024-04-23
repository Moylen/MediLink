import { Repository } from 'typeorm';
import { Doctor } from './entities/doctor.entity';
export declare class DoctorsService {
    private readonly doctorRepository;
    constructor(doctorRepository: Repository<Doctor>);
    getDoctorByEmail(email: string): Promise<Doctor>;
}
