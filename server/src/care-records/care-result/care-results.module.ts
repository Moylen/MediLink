import { Module } from '@nestjs/common';
import { CareResult } from './care-result.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CareResultsController } from './care-results.controller';
import { CareResultsService } from './care-results.service';
import { AuthModule } from '../../auth/auth.module';
import { FilesModule } from '../../files/files.module';
import { CareRecord } from '../care-record.entity';


@Module({
  controllers: [CareResultsController],
  providers: [CareResultsService],
  imports: [
    TypeOrmModule.forFeature([CareResult]),
    TypeOrmModule.forFeature([CareRecord]),
    AuthModule,
    FilesModule
  ],
})
export class CareResultsModule {}
