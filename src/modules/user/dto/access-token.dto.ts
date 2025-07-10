import { IsNotEmpty, IsDateString, IsNumber } from 'class-validator';

export class AccessTokenDTO {
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @IsDateString()
  @IsNotEmpty()
  created_at: Date;
}