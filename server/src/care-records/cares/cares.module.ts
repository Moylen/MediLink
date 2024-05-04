import { Module } from '@nestjs/common';
import { CaresService } from './cares.service';
import { CaresController } from './cares.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Care } from './entities/care.entity';
import { AuthModule } from '../../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Care]),
    AuthModule
  ],
  controllers: [CaresController],
  providers: [CaresService]
})
export class CaresModule {}
