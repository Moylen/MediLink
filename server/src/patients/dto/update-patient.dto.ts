import { OmitType } from '@nestjs/swagger';
import { CreatePatientDto } from './create-patient.dto';


export class UpdatePatientDto extends OmitType(CreatePatientDto, ['password', 'role'] as const) {
}
