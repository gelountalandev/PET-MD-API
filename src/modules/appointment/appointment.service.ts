import { Injectable } from '@nestjs/common';
import { AppointmentModel } from '../../models/appointment.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppointmentDTO } from './dto/appointment.dto';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(AppointmentModel)
    private readonly appointmentRepository: Repository<AppointmentModel>,
  ) { }

  async createAppointment(appointmentDTO: AppointmentDTO): Promise<AppointmentModel> {
    const appointment = this.appointmentRepository.create({ ...appointmentDTO, created_at: new Date() })
    return await this.appointmentRepository.save(appointment)
  }

  async getAppointments(): Promise<AppointmentModel[]> {
    return await this.appointmentRepository.find()
  }

  async getAppointment(id: number): Promise<AppointmentModel | null> {
    return await this.appointmentRepository.findOne({ where: { id: id } });
  }

  async findOne(id: number): Promise<boolean> {
    const findOne = await this.appointmentRepository.findOne({ where: { id } })
    return !!findOne
  }

  async findAppointment(appointment_id: number): Promise<boolean> {
    const findAppointment = await this.appointmentRepository.findOne({ where: { id: appointment_id } })
    return !!findAppointment

  }
}