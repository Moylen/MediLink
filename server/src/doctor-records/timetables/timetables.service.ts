import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Timetable } from './timetable.entity';
import { CreateTimetableDto } from './dto/create-timetable.dto';
import { FilterTimetableDto } from './dto/filter-timetable.dto';

@Injectable()
export class TimetablesService {
  constructor(
    @InjectRepository(Timetable)
    private readonly timetableRepository: Repository<Timetable>,
  ) {
  }

  async createTimetable(dto: CreateTimetableDto) {
    const conflictTimetable =
      await this.timetableRepository.createQueryBuilder('timetable')
        .where(`DATE_SUBTRACT(:time, INTERVAL '30 MINUTE') < timetable.time`, { ...dto })
        .andWhere(`timetable.time < DATE_ADD(:time, INTERVAL '30 MINUTE')`, { ...dto })
        .andWhere(`timetable.doctorId = :doctorId`, { ...dto })
        .getOne();

    if (conflictTimetable) {
      throw new BadRequestException('Timetables in range 30 minutes already exists');
    }

    const timetable = await this.timetableRepository.save({
      time: dto.time,
      doctor: { id: dto.doctorId },
    });
    return this.timetableRepository.findOne({
      where: { id: timetable.id },
      relations: ['doctor.speciality'],
    });
  }

  async getTimetableById(id: number) {
    const timetable = await this.timetableRepository.findOne({
      where: { id },
      relations: ['doctor.speciality'],
    });
    if (!timetable) {
      throw new NotFoundException('Timetable not found');
    }
    return timetable;
  }

  async getTimetablesByFilter(dto: FilterTimetableDto) {
    const timetables =
      await this.timetableRepository.createQueryBuilder('timetable')
        .leftJoinAndSelect('timetable.doctor', 'doctor')
        .leftJoinAndSelect('doctor.speciality', 'speciality')
        .where(`DATE(timetable.time) = DATE(:date)`, { ...dto })
        .andWhere(`timetable.doctorId = :doctorId`, { ...dto })
        .getMany();
    if (timetables.length === 0) {
      throw new NotFoundException('Timetables not found');
    }
    return timetables;
  }

  async deleteTimetableById(id: number) {
    const timetable = await this.timetableRepository.findOneBy({ id });
    if (!timetable) {
      throw new NotFoundException('Timetable not found');
    }
    await this.timetableRepository.delete(timetable.id);
    return timetable;
  }
}
