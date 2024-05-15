import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
  ) {
  }

  async createAppointment(dto: CreateAppointmentDto) {
    const conflictAppointment = await this.appointmentRepository.findOne({
      where: {
        doctorRecord: { id: dto.doctorRecordId },
      },
    });

    if (conflictAppointment) {
      throw new BadRequestException('Appointment for this doctor record already exists');
    }

    const appointment = await this.appointmentRepository.save({
      ...dto,
      doctorRecord: { id: dto.doctorRecordId },
    });
    return await this.appointmentRepository.findOneBy({ id: appointment.id });
  }

  async getAppointmentById(id: number) {
    const appointment = await this.appointmentRepository.findOneBy({ id });
    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }
    return appointment;
  }

  async getAppointmentsByPatientId(id: number) {
    const appointments = await this.appointmentRepository.find({
      where: {
        doctorRecord: {
          patient: { id },
        },
      },
    });

    if (appointments.length === 0) {
      throw new NotFoundException('Appointments not found');
    }

    return appointments;
  }

  async updateAppointment(id: number, dto: UpdateAppointmentDto) {
    const appointment = await this.appointmentRepository.findOneBy({ id });
    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }
    Object.assign(appointment, dto);
    return await this.appointmentRepository.save(appointment);
  }

  async deleteAppointmentById(id: number) {
    const appointment = await this.appointmentRepository.findOneBy({ id });
    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }
    await this.appointmentRepository.delete(appointment.id);
    return appointment;
  }
}
