import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientsModule } from './patients/patients.module';
import { dataSourceOptions } from '../db/data-source';
import { AuthModule } from './auth/auth.module';
import { DoctorsModule } from './doctors/doctors.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ExcludePasswordInterceptor } from './common/interceptors/exclude-password.interceptor';
import { CareRecordsModule } from './care-records/care-records.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    PatientsModule,
    AuthModule,
    DoctorsModule,
    CareRecordsModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ExcludePasswordInterceptor,
    },
  ],
})
export class AppModule {
}
