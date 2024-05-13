import { Module } from '@nestjs/common';
import { DepartmentsController } from './departments.controller';
import { DepartmentsService } from './departments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from './department.entity';
import { AuthModule } from '../../auth/auth.module';


@Module({
  controllers: [DepartmentsController],
  imports: [
    TypeOrmModule.forFeature([Department]),
    AuthModule
  ],
  providers: [DepartmentsService],
})
export class DepartmentsModule {}
