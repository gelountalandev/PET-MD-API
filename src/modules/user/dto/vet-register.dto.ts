import { IsString, IsEmail, IsNotEmpty, IsEnum, IsNumber, IsBoolean, MinLength, Matches } from 'class-validator';
import { USER_TYPE } from '../../../app.constants';

export class VetDTO {
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @IsString()
  @IsNotEmpty()
  clinic_name: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  clinic_location: string;

  @IsNotEmpty()
  @IsBoolean()
  is_active: boolean;
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


export class VetRegisterDTO {
  user: UserDTO;
  vet: VetDTO;
}