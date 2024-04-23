import { Body, Controller, Post } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/CreatePatientDto';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientService: PatientsService) {}




}
