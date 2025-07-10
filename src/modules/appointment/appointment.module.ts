import { Module } from '@nestjs/common';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentModel } from '../../models/appointment.model';
import { PetOwnerModel } from '../../models/pet_owner.model';
import { VetModel } from '../../models/vet.model';
import { UserModule } from '../user/user.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      AppointmentModel,
      PetOwnerModel,
      VetModel,
    ]),
    UserModule,
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService],
  exports: [AppointmentService]
})
export class AppointmentModule { }
