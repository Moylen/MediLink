import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreatePatientDto } from '../patients/dto/create-patient.dto';
import { ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @ApiOperation({ summary: 'Авторизация (доктор и пациент)' })
  @ApiResponse({status: HttpStatus.CREATED, description: "JWT", type: String})
  @Post()
  login(@Body() loginDto: LoginDto) {
    if (loginDto.role === 'doctor') {
      return this.authService.loginDoctor(loginDto)
    }
    return this.authService.loginPatient(loginDto);
  }

  @ApiOperation({ summary: 'Регистрация пациента' })
  @ApiResponse({status: HttpStatus.CREATED, description: "JWT", type: String})
  @Post('patient/registration')
  registerPatient(@Body() createPatientDto: CreatePatientDto) {
    return this.authService.registerPatient(createPatientDto);
  }
}
