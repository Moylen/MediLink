import { OmitType } from '@nestjs/swagger';
import { CreateAppointmentDto } from './create-appointment.dto';

export class UpdateAppointmentDto extends OmitType(CreateAppointmentDto, ['doctorRecordId'] as const) {
}