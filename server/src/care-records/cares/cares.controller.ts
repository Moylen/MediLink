import { Controller, Post, Get, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { CaresService } from './cares.service';
import { CreateCareDto } from './dto/create-care.dto';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../../auth/guards/role.guard';
import { UserRoleEnum } from '../../common/enums/user-role.enum';
import { UpdateCareDto } from './dto/update-care.dto';
import { Care } from './care.entity';

@ApiTags('Cares')
@ApiBearerAuth()
@Roles(UserRoleEnum.Doctor)
@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('cares')
export class CaresController {
  constructor(private readonly careService: CaresService) {}

  @ApiOperation({ summary: 'Создать мед. услугу | roles: doctor' })
  @ApiOkResponse({ type: Care })
  @Post()
  createMedicalService(@Body() dto: CreateCareDto) {
    return this.careService.createCare(dto);
  }

  @ApiOperation({ summary: 'Получить мед.услугу по ID | roles: doctor' })
  @ApiOkResponse({ type: Care })
  @Get(':id')
  getById(@Param('id') id: number) {
    return this.careService.getCareById(id);
  }

  @ApiOperation({ summary: 'Изменить мед. услугу по ID | roles: doctor' })
  @ApiOkResponse({ type: Care })
  @Patch(':id')
  updateByID(@Param('id') id: number, @Body() dto: UpdateCareDto) {
    return this.careService.updateCareById(id, dto);
  }
}
