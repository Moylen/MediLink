import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../../auth/guards/role.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRoleEnum } from '../../common/enums/user-role.enum';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './department.entity';

@ApiTags('Departments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RoleGuard)
@Roles(UserRoleEnum.Patient, UserRoleEnum.Doctor)
@Controller('departments')
export class DepartmentsController {
  constructor(
    private readonly departmentsService: DepartmentsService,
  ) {
  }

  @ApiOperation({ summary: 'Получить отдел по ID | roles: patient, doctor' })
  @ApiOkResponse({ type: Department })
  @Roles(UserRoleEnum.Patient, UserRoleEnum.Doctor)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get(':id')
  getDepartmentById(@Param('id') id: number) {
    return this.departmentsService.getDepartmentById(id);
  }

  @ApiOperation({ summary: 'Получить все отделы | roles: patient, doctor' })
  @ApiOkResponse({ type: [Department] })
  @Roles(UserRoleEnum.Patient, UserRoleEnum.Doctor)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  getAllDepartments() {
    return this.departmentsService.getAllDepartments();
  }

  @ApiOperation({ summary: 'Создать отдел | roles: doctor' })
  @ApiOkResponse({ type: Department })
  @Roles(UserRoleEnum.Patient, UserRoleEnum.Doctor)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  createDepartment(@Body() dto: CreateDepartmentDto) {
    return this.departmentsService.createDepartment(dto);
  }

  @ApiOperation({ summary: 'Обновить отдел по ID | roles: doctor' })
  @ApiOkResponse({ type: Department })
  @Roles(UserRoleEnum.Patient, UserRoleEnum.Doctor)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch(':id')
  updateDepartmentById(@Param('id') id: number, @Body() dto: UpdateDepartmentDto) {
    return this.departmentsService.updateDepartmentById(id, dto);
  }

}
