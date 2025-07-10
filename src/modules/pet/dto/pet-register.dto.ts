import { IsDateString, IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator'

export class PetDTO {
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  breed: string;

  @IsString()
  species: string;

  @IsString()
  birth_date: Date;

  @IsString()
  gender: string;

  @IsString()
  weight: string;

  @IsDateString()
  @IsOptional()
  created_at?: Date;
}
