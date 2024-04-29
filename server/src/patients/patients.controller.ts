import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { PatientDto } from './dto/patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Patient')
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientService: PatientsService) {
  }

  @ApiOperation({ summary: 'Получить пациента по ID | roles: doctor, patient' })
  @ApiParam({ name: 'id', description: 'ID пациента' })
  @ApiOkResponse({ type: PatientDto })
  @ApiBearerAuth()
  @Roles('patient', 'doctor')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get(':id')
  getById(@Param('id') id: number) {
    return this.patientService.getPatientById(id);
  }

  @ApiOperation({ summary: 'Обновить информацию пациента по ID | roles: doctor, patient' })
  @ApiParam({ name: 'id', description: 'ID пациента' })
  @ApiOkResponse({ type: PatientDto })
  @ApiBearerAuth()
  @Roles('patient', 'doctor')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch(':id')
  updateById(@Param('id') id: number, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientService.updatePatientById(id, updatePatientDto);
  }

  @ApiOperation({ summary: 'Получить всех пациентов | roles: doctor, patient' })
  @ApiOkResponse({ type: [PatientDto] })
  @ApiBearerAuth()
  @Roles('patient', 'doctor')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  getAll() {
    return this.patientService.getAllPatients();
  }


}
