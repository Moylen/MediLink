import { Module } from '@nestjs/common';
import { TimetablesService } from './timetables.service';
import { TimetablesController } from './timetables.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Timetable } from './timetable.entity';
import { AuthModule } from '../../auth/auth.module';

@Module({
  controllers: [TimetablesController],
  providers: [TimetablesService],
  imports: [
    TypeOrmModule.forFeature([Timetable]),
    AuthModule
  ]
})
export class TimetablesModule {}
