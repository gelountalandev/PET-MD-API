import { Module } from '@nestjs/common';
import { ConsultationController } from '../consultation/consultation.controller';
import { ConsultationService } from '../consultation/consultation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsultationModel } from '../../models/consultation.model';
import { AppointmentModule } from '../appointment/appointment.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ConsultationModel,
    ]),
    AppointmentModule,
  ],
  controllers: [ConsultationController],
  providers: [ConsultationService],
  exports: [ConsultationService]
})
export class ConsultationModule { }
