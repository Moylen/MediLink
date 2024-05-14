import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { TimetablesService } from './timetables.service';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../../auth/guards/role.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRoleEnum } from '../../common/enums/user-role.enum';
import { CreateTimetableDto } from './dto/create-timetable.dto';
import { Timetable } from './timetable.entity';
import { FilterTimetableDto } from './dto/filter-timetable.dto';

@ApiTags('Timetables')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('timetables')
export class TimetablesController {
  constructor(private readonly timetablesService: TimetablesService) {}

  @ApiOperation({ summary: 'Создать время для записи (Должен быть интервал в 30 минут) | roles: doctor' })
  @ApiOkResponse({ type: Timetable })
  @Roles(UserRoleEnum.Doctor)
  @Post()
  createTimetable(@Body() dto: CreateTimetableDto) {
    return this.timetablesService.createTimetable(dto);
  }

  @ApiOperation({ summary: 'Получить время для записи по ID | roles: patient, doctor' })
  @ApiOkResponse({ type: Timetable })
  @Roles(UserRoleEnum.Patient, UserRoleEnum.Doctor)
  @Get(':id')
  getTimetableById(@Param('id') id: number) {
    return this.timetablesService.getTimetableById(id);
  }

  @ApiOperation({ summary: 'Получить время для записи по фильтру | roles: patient, doctor' })
  @ApiOkResponse({ type: [Timetable] })
  @Roles(UserRoleEnum.Patient, UserRoleEnum.Doctor)
  @Get()
  getTimetablesByFilter(@Query() dto: FilterTimetableDto) {
    return this.timetablesService.getTimetablesByFilter(dto);
  }

  @ApiOperation({ summary: 'Удалить время для записи | roles: doctor' })
  @ApiOkResponse({ type: Timetable })
  @Roles(UserRoleEnum.Doctor)
  @Delete(':id')
  deleteTimetableById(@Param('id') id: number) {
    return this.timetablesService.deleteTimetableById(id);
  }
}
