import { Module } from '@nestjs/common';
import { CareRecordsService } from './care-records.service';
import { CareRecordsController } from './care-records.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CareRecord } from './care-record.entity';
import { AuthModule } from '../auth/auth.module';
import { CaresModule } from './cares/cares.module';
import { CareResultsModule } from './care-result/care-results.module';

@Module({
  controllers: [CareRecordsController],
  providers: [CareRecordsService],
  imports: [
    TypeOrmModule.forFeature([CareRecord]),
    AuthModule,
    CaresModule,
    CareResultsModule
  ]
})
export class CareRecordsModule {}
