import { forwardRef, Module } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorsController } from './doctors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [DoctorsController],
  providers: [DoctorsService],
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([Doctor]),
  ],
})

export class DoctorsModule {}
