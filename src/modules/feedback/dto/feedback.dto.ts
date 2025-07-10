import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class FeedbackDTO {
  @IsNumber()
  @IsNotEmpty()
  consultation_id: number;

  @IsNotEmpty()
  @IsString()
  rating: string;

  @IsString()
  @IsOptional()
  comment: string;

  @IsDateString()
  @IsOptional()
  created_at: Date;
}
