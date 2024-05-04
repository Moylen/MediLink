import { forwardRef, Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { AuthModule } from '../auth/auth.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Patient]),
    forwardRef(() => AuthModule)
  ],
  controllers: [PatientsController],
  providers: [
    PatientsService,
    JwtService
  ],
})
export class PatientsModule {}
