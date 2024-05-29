import { Module } from '@nestjs/common';
import { DoctorRecordsService } from './doctor-records.service';
import { DoctorRecordsController } from './doctor-records.controller';
import { TimetablesModule } from './timetables/timetables.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorRecord } from './doctor-record.entity';
import { AuthModule } from '../auth/auth.module';
import { Timetable } from './timetables/timetable.entity';

@Module({
  controllers: [DoctorRecordsController],
  providers: [DoctorRecordsService],
  imports: [
    TypeOrmModule.forFeature([DoctorRecord]),
    TypeOrmModule.forFeature([Timetable]),
    TimetablesModule,
    AuthModule
  ],
})
export class DoctorRecordsModule {}
