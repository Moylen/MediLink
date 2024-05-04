import { Body, Controller, Get, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CareResultsService } from './care-results.service';
import { CreateCareResultDto } from './dto/create-care-result.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../../auth/guards/role.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRoleEnum } from '../../common/enums/user-role.enum';
import { CareResult } from './entities/care-result.entity';

@ApiTags('Care Results')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RoleGuard)
@Roles(UserRoleEnum.Doctor, UserRoleEnum.Patient)
@Controller('care-results')
export class CareResultsController {
  constructor(private readonly careResultsService: CareResultsService) {
  }

  @ApiOperation({ summary: 'Создать результат услуги' })
  @ApiOkResponse({ type: CareResult })
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  createCareResult(@Body() dto: CreateCareResultDto,
                   @UploadedFile() file: any) {
    return this.careResultsService.createRecord(dto, file);
  }

  @ApiOperation({ summary: 'Получить результат услуги по ID' })
  @ApiOkResponse({ type: CareResult })
  @Get(':id')
  getCareResultById(id: number) {
    return this.careResultsService.getCareResultById(id);
  }


}
