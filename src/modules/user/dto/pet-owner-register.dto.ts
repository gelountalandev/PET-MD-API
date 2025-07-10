import { IsString, IsEmail, IsNotEmpty, IsDateString, IsEnum, IsNumber } from 'class-validator';
import { USER_TYPE } from '../../../app.constants';

export class PetOwnerDTO {
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  contact_number: number;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsDateString()
  @IsNotEmpty()
  created_at?: Date;
}


export class UserDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(USER_TYPE)
  user_type?: USER_TYPE;
}


export class PetOwnerRegisterDTO {
  user: UserDTO;
  petOwner: PetOwnerDTO;
}