import { IsString, IsEmail, IsNotEmpty, IsDateString, IsEnum, IsNumber, MinLength, Matches } from 'class-validator';
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
  @MinLength(8, { message: "Password must be at least 8 characters long" })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/, {
    message:
      'Password must contain at least one letter and one number',
  })
  password: string;

  @IsEnum(USER_TYPE)
  user_type?: USER_TYPE;
}


export class PetOwnerRegisterDTO {
  user: UserDTO;
  petOwner: PetOwnerDTO;
}