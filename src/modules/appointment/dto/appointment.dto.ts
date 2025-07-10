import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { APPOINTMENT_STATUS, CONSULTATION_TYPE } from '../../../app.constants';

export class AppointmentDTO {
  @IsNotEmpty()
  @IsNumber()
  pet_owner_id: number;

  @IsNotEmpty()
  @IsNumber()
  vet_id: number;

  @IsDateString()
  @IsNotEmpty()
  schedule_time: Date;

  @IsEnum(CONSULTATION_TYPE)
  consultation_type: CONSULTATION_TYPE;

  @IsEnum(APPOINTMENT_STATUS)
  status: APPOINTMENT_STATUS;

  @IsDateString()
  @IsOptional()
  started_at?: Date;

  @IsDateString()
  @IsOptional()
  ended_at?: Date;

  @IsDateString()
  @IsOptional()
  created_at: Date;
}