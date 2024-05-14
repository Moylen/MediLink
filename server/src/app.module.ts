import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientsModule } from './patients/patients.module';
import { dataSourceOptions } from '../db/data-source';
import { AuthModule } from './auth/auth.module';
import { DoctorsModule } from './doctors/doctors.module';
import { CareRecordsModule } from './care-records/care-records.module';
import { FilesModule } from './files/files.module';
import { DepartmentsModule } from './doctors/departments/departments.module';
import { DoctorRecordsModule } from './doctor-records/doctor-records.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    PatientsModule,
    AuthModule,
    DoctorsModule,
    CareRecordsModule,
    FilesModule,
    DepartmentsModule,
    DoctorRecordsModule,
  ],
})
export class AppModule {
}
