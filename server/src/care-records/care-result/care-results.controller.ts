import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post, Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CareResultsService } from './care-results.service';
import { Response } from 'express';
import { CreateCareResultDto } from './dto/create-care-result.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../../auth/guards/role.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRoleEnum } from '../../common/enums/user-role.enum';
import { CareResult } from './care-result.entity';
import * as path from 'path';
import * as fs from 'fs';

@ApiTags('Care Results')
@ApiBearerAuth()
@Controller('care-results')
export class CareResultsController {
  constructor(private readonly careResultsService: CareResultsService) {
  }

  @ApiOperation({ summary: 'Создать результат услуги | roles: doctor' })
  @ApiOkResponse({ type: CareResult })
  @ApiConsumes('multipart/form-data')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserRoleEnum.Doctor)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  createCareResult(@UploadedFile() file: Express.Multer.File,
                   @Body() dto: CreateCareResultDto) {
    return this.careResultsService.createCareResult(dto, file);
  }

  @ApiOperation({ summary: 'Получить результат услуги по ID | roles: patient, doctor' })
  @ApiOkResponse({ type: CareResult })
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserRoleEnum.Doctor, UserRoleEnum.Patient)
  @Get(':id')
  getCareResultById(@Param('id') id: number) {
    return this.careResultsService.getCareResultById(id);
  }


  @ApiOperation({ summary: 'Загрузить результат услуги по названию файла | roles: patient, doctor' })
  @ApiOkResponse({ type: CareResult })
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserRoleEnum.Doctor, UserRoleEnum.Patient)
  @Get('download/:fileName')
  downloadFile(@Param('fileName') fileName: string, @Res() res: Response) {
    const filePath = path.resolve(__dirname, '../../../..', 'uploads', fileName);
    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('File not found');
    }
    res.download(filePath);
  }

  @ApiOperation({ summary: 'Получить результаты услуг по ID пациента | roles: patient, doctor' })
  @ApiOkResponse({ type: CareResult })
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserRoleEnum.Doctor, UserRoleEnum.Patient)
  @Get()
  getCareResultByPatientId(@Query('patient_id') patientId: number) {
    return this.careResultsService.getCareResultsByPatientId(patientId);
  }

}
