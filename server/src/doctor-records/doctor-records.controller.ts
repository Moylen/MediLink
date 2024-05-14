import { Controller } from '@nestjs/common';
import { DoctorRecordsService } from './doctor-records.service';

@Controller('doctor-records')
export class DoctorRecordsController {
  constructor(private readonly doctorRecordsService: DoctorRecordsService) {}
}
