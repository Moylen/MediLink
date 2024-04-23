import { AuthService } from './auth.service';
import { CreatePatientDto } from '../patients/dto/CreatePatientDto';
import { LoginDto } from './dto/LoginDto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        token: string;
    }>;
    registerPatient(createPatientDto: CreatePatientDto): Promise<{
        token: string;
    }>;
}
