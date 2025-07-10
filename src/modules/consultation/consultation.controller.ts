import { Body, Controller, Post, ValidationPipe, Get, ParseIntPipe, Param, NotFoundException } from '@nestjs/common';
import { ConsultationService } from './consultation.service';
import { ConsultationDTO } from './dto/consultation.dto';
import { AppointmentService } from '../appointment/appointment.service';

@Controller('consultation')
export class ConsultationController {
  constructor(
    private readonly consultationService: ConsultationService,
    private readonly appointmentService: AppointmentService,
  ) { }

  @Post()
  async createConsultation(@Body(ValidationPipe) consultationDTO: ConsultationDTO): Promise<ConsultationDTO> {
    if (!await this.appointmentService.findAppointment(consultationDTO.appointment_id))
      throw new NotFoundException("Appointment Not Found")
    return this.consultationService.createConsultation(consultationDTO)
  }

  @Get()
  getConsultations(): Promise<ConsultationDTO[]> {
    return this.consultationService.getConsultations()
  }

  @Get(':id')
  async getConsultation(@Param('id', ParseIntPipe) id: number): Promise<ConsultationDTO | null> {
    if (!await this.consultationService.findOne(id))
      throw new NotFoundException("Consultation Not Found")
    return this.consultationService.getConsultation(id)
  }
}