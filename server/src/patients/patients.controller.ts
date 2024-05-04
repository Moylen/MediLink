import { Body, Controller, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRoleEnum } from '../common/enums/user-role.enum';
import { Patient } from './entities/patient.entity';

@ApiTags('Patient')
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientService: PatientsService) {
  }

  @ApiOperation({ summary: 'Получить пациента по ID | roles: doctor' })
  @ApiParam({ name: 'id', description: 'ID пациента' })
  @ApiOkResponse({ type: Patient })
  @ApiBearerAuth()
  @Roles(UserRoleEnum.Doctor)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get(':id')
  getById(@Param('id') id: number) {
    return this.patientService.getPatientById(id);
  }

  @ApiOperation({ summary: 'Обновить пациента из токена | roles: patient' })
  @ApiOkResponse({ type: Patient })
  @ApiBearerAuth()
  @Roles(UserRoleEnum.Patient)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch()
  updateMe(@Req() req: any, @Body() updatePatientDto: UpdatePatientDto) {
    const id = req.user.id;
    return this.patientService.updatePatientById(id, updatePatientDto);
  }

  @ApiOperation({ summary: 'Получить пациента из токена | roles: patient' })
  @ApiOkResponse({ type: [Patient] })
  @ApiBearerAuth()
  @Roles(UserRoleEnum.Patient)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  getMe(@Req() req: any) {
    const id = req.user.id;
    return this.patientService.getPatientById(id);
  }


}
