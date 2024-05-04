import { PartialType } from '@nestjs/swagger';
import { CreateCareRecordDto } from './create-care-record.dto';

export class UpdateCareRecordDto extends PartialType(CreateCareRecordDto) {}