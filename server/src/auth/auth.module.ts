import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import * as process from 'node:process';
import { PatientsModule } from '../patients/patients.module';
import { PatientsService } from '../patients/patients.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from '../patients/entities/patient.entity';
import * as dotenv from 'dotenv';
import { Doctor } from '../doctors/entities/doctor.entity';
import { DoctorsModule } from '../doctors/doctors.module';
import { DoctorsService } from '../doctors/doctors.service';

dotenv.config();

@Module({
  controllers: [AuthController],
  providers: [AuthService, PatientsService, DoctorsService],
  imports: [
    forwardRef(() => PatientsModule),
    forwardRef(() => DoctorsModule),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
      signOptions: { expiresIn: '30d' },
    }),
    TypeOrmModule.forFeature([Patient]),
    TypeOrmModule.forFeature([Doctor]),
  ],
})
export class AuthModule {
}
