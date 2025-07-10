import { Body, Controller, ValidationPipe, Post, Get, Param, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentDTO } from './dto/appointment.dto';
import { UserService } from '../user/user.service';
import { AppointmentModel } from '../../models/appointment.model';

@Controller('appointment')
export class AppointmentController {
  constructor(
    private readonly appointmentService: AppointmentService,
    private readonly userService: UserService,
  ) { }

  @Post()
  async createAppointment(@Body(ValidationPipe) appointmentDTO: AppointmentDTO): Promise<AppointmentModel> {
    if (!await this.userService.vetCheck(appointmentDTO.vet_id))
      throw new NotFoundException("Vet Not Found")
    if (!await this.userService.petOwnerCheck(appointmentDTO.pet_owner_id))
      throw new NotFoundException("Pet Owner Not Found")
    return this.appointmentService.createAppointment(appointmentDTO)
  }

  @Get()
  getAppointments(): Promise<AppointmentModel[]> {
    return this.appointmentService.getAppointments()
  }

  @Get(':id')
  async getAppointment(@Param('id', ParseIntPipe) id: number): Promise<AppointmentModel | null> {
    if (!await this.appointmentService.findOne(id))
      throw new NotFoundException("Appointment Not Found")
    return this.appointmentService.getAppointment(id)
  }
}
