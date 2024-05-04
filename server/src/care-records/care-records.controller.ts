import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CareRecordsService } from './care-records.service';
import { UpdateCareRecordDto } from './dto/update-care-record.dto';
import { CreateCareRecordDto } from './dto/create-care-record.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRoleEnum } from '../common/enums/user-role.enum';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CareRecord } from './entities/care-record.entity';

@ApiTags('Care Records')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RoleGuard)
@Roles(UserRoleEnum.Patient, UserRoleEnum.Doctor)
@Controller('care-records')
export class CareRecordsController {
  constructor(private readonly careRecordsService: CareRecordsService) {}

  @ApiOperation({ summary: 'Создать запись | roles: patient, doctor' })
  @ApiOkResponse({ type: CareRecord })
  @Post()
  createServiceRecord(@Body() dto: CreateCareRecordDto) {
    return this.careRecordsService.createCareRecord(dto);
  }

  @ApiOperation({ summary: 'Получить запись по ID | roles: patient, doctor' })
  @ApiOkResponse({ type: CareRecord })
  @Get()
  getServiceRecordById(@Param('id') id: number) {
    return this.careRecordsService.getCareRecorddById(id);
  }

  @ApiOperation({ summary: 'Изменить запись по ID | roles: patient, doctor' })
  @ApiOkResponse({ type: CareRecord })
  @Patch()
  updateServiceRecordById(@Param('id') id: number, @Body() dto: UpdateCareRecordDto) {
    return this.careRecordsService.updateCareRecordById(id, dto);
  }
}
