import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientsModule } from './patients/patients.module';
import { dataSourceOptions } from '../db/data-source';
import { AuthModule } from './auth/auth.module';
import { DoctorsModule } from './doctors/doctors.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    PatientsModule,
    AuthModule,
    DoctorsModule
  ],
})
export class AppModule {
}
