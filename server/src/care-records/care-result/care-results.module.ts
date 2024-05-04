import { Module } from '@nestjs/common';
import { CareResult } from './entities/care-result.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CareResultsController } from './care-results.controller';
import { CareResultsService } from './care-results.service';


@Module({
  controllers: [CareResultsController],
  providers: [CareResultsService],
  imports: [
    TypeOrmModule.forFeature([CareResult]),
  ]
})
export class CareResultsModule {}
