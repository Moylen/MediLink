import { Module } from '@nestjs/common';
import { DoctorRecordsService } from './doctor-records.service';
import { DoctorRecordsController } from './doctor-records.controller';
import { TimetablesModule } from './timetables/timetables.module';

@Module({
  controllers: [DoctorRecordsController],
  providers: [DoctorRecordsService],
  imports: [TimetablesModule],
})
export class DoctorRecordsModule {}
