import { PickType } from '@nestjs/swagger';
import { CreateDoctorRecordDto } from './create-doctor-record.dto';

export class UpdateDoctorRecordDto extends PickType(CreateDoctorRecordDto, ['status'] as const) {
}