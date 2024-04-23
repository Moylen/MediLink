import { Body, Controller, HttpStatus, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreatePatientDto } from '../patients/dto/CreatePatientDto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/LoginDto';

@UsePipes(new ValidationPipe())
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @ApiOperation({ summary: 'Авторизация (доктор и пациент)' })
  @Post()
  login(@Body() loginDto: LoginDto) {
    if (loginDto.role === 'doctor') {
      return this.authService.loginDoctor(loginDto)
    }
    return this.authService.loginPatient(loginDto);
  }

  @ApiOperation({ summary: 'Регистрация пациента' })
  @Post('patient/registration')
  registerPatient(@Body() createPatientDto: CreatePatientDto) {
    return this.authService.registerPatient(createPatientDto);
  }
}
