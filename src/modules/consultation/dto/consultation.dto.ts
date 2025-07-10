import { IsString, IsNotEmpty, IsDateString, IsNumber, IsOptional } from 'class-validator'

export class ConsultationDTO {
  @IsNotEmpty()
  @IsNumber()
  appointment_id: number;

  @IsString()
  @IsOptional()
  notes: string;

  @IsString()
  @IsOptional()
  prescription: string;

  @IsString()
  duration: string;

  @IsDateString()
  @IsOptional()
  created_at: Date;
}
