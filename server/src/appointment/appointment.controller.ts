import { Controller, Body, Get, Patch, Post, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { Appointment } from './appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRoleEnum } from '../common/enums/user-role.enum';

@ApiTags('Appointments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @ApiOperation({ summary: 'Создать результат записи | roles: doctor' })
  @ApiOkResponse({ type: Appointment })
  @Roles(UserRoleEnum.Doctor)
  @Post()
  createAppointment(@Body() dto: CreateAppointmentDto) {
    return this.appointmentService.createAppointment(dto);
  }

  @ApiOperation({ summary: 'Получить результат записи по ID | roles: patient, doctor' })
  @ApiOkResponse({ type: Appointment })
  @Roles(UserRoleEnum.Patient, UserRoleEnum.Doctor)
  @Get(':id')
  getAppointmentById(@Param('id') id: number) {
    return this.appointmentService.getAppointmentById(id);
  }

  @ApiOperation({ summary: 'Получить результаты записи по ID пациента | roles: patient, doctor' })
  @ApiOkResponse({ type: [Appointment] })
  @Roles(UserRoleEnum.Patient, UserRoleEnum.Doctor)
  @Get()
  getAppointmentsByPatientId(@Query('patient_id') id: number) {
    return this.appointmentService.getAppointmentsByPatientId(id);
  }

  @ApiOperation({ summary: 'Обновить результат записи по ID | roles: doctor' })
  @ApiOkResponse({ type: Appointment })
  @Roles(UserRoleEnum.Doctor)
  @Patch(':id')
  updateAppointmentById(@Param('id') id: number, @Body() dto: UpdateAppointmentDto) {
    return this.appointmentService.updateAppointment(id, dto);
  }

  @ApiOperation({ summary: 'Удалить результат записи по ID | roles: doctor' })
  @ApiOkResponse({ type: Appointment })
  @Roles(UserRoleEnum.Doctor)
  @Delete(':id')
  deleteAppointmentById(@Param('id') id: number) {
    return this.appointmentService.deleteAppointmentById(id);
  }
}
