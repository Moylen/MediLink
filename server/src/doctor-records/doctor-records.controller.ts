import { Body, Controller, Param, Post, Get, Patch, UseGuards, Query } from '@nestjs/common';
import { DoctorRecordsService } from './doctor-records.service';
import { CreateDoctorRecordDto } from './dto/create-doctor-record.dto';
import { UpdateDoctorRecordDto } from './dto/update-doctor-record.dto';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRoleEnum } from '../common/enums/user-role.enum';
import { DoctorRecord } from './doctor-record.entity';

@ApiTags('Doctor Records')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('doctor-records')
export class DoctorRecordsController {
  constructor(private readonly doctorRecordsService: DoctorRecordsService) {
  }

  @ApiOperation({ summary: 'Создать запись | roles: patient, doctor' })
  @ApiOkResponse({ type: DoctorRecord })
  @Roles(UserRoleEnum.Patient, UserRoleEnum.Doctor)
  @Post()
  createDoctorRecord(@Body() dto: CreateDoctorRecordDto) {
    return this.doctorRecordsService.createDoctorRecord(dto);
  }

  @ApiOperation({ summary: 'Получить запись | roles: patient, doctor' })
  @ApiOkResponse({ type: DoctorRecord })
  @Roles(UserRoleEnum.Patient, UserRoleEnum.Doctor)
  @Get(':id')
  getDoctorRecordById(@Param('id') id: number) {
    return this.doctorRecordsService.getDoctorRecordById(id);
  }

  @ApiOperation({ summary: 'Получить запись по ID пациента | roles: patient, doctor' })
  @ApiOkResponse({ type: [DoctorRecord] })
  @Roles(UserRoleEnum.Patient, UserRoleEnum.Doctor)
  @Get()
  getDoctorRecordByPatientId(@Query('patient_id') id: number) {
    return this.doctorRecordsService.getDoctorRecordsByPatientId(id);
  }

  @ApiOperation({ summary: 'Обновить запись | roles: doctor' })
  @ApiOkResponse({ type: DoctorRecord })
  @Roles(UserRoleEnum.Doctor)
  @Patch(':id')
  updateDoctorRecordById(@Param('id') id: number, @Body() dto: UpdateDoctorRecordDto) {
    return this.doctorRecordsService.updateDoctorRecordById(id, dto);
  }
}
