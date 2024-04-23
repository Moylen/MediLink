import { Speciality } from './speciality.entity';
import { Department } from './department.entity';
export declare class Doctor {
    id: number;
    email: string;
    password: string;
    role: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    experience: number;
    birthday: Date;
    createdAt: Date;
    speciality: Speciality;
    department: Department;
}
