import { Body, Controller, Post, ValidationPipe, Get, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { UserService } from './user.service';
import { PetOwnerDTO, PetOwnerRegisterDTO } from './dto/pet-owner-register.dto';
import { VetDTO, VetRegisterDTO } from './dto/vet-register.dto';
import { UserModel } from '../../models/user.model';
import { AccessTokenDTO } from './dto/access-token.dto';
import { SkipThrottle, Throttle } from '@nestjs/throttler';

@Controller('users')
export class UserController {

  constructor(
    private readonly userService: UserService,
  ) { }

  @Post('register/pet-owner')
  async petOwnerRegister(@Body(ValidationPipe) petOwnerRegisterDTO: PetOwnerRegisterDTO): Promise<PetOwnerDTO> {
    if (await this.userService.checkEmail(petOwnerRegisterDTO.user.email))
      throw new InternalServerErrorException("Email Already Exist")
    if (await this.userService.checkUsername(petOwnerRegisterDTO.user.username))
      throw new InternalServerErrorException("Username Already Exist")
    return this.userService.petOwnerRegister(petOwnerRegisterDTO.user, petOwnerRegisterDTO.petOwner);
  }

  @Post('register/vet')
  async vetRegister(@Body(ValidationPipe) vetRegisterDTO: VetRegisterDTO): Promise<VetDTO> {
    if (await this.userService.checkEmail(vetRegisterDTO.user.email))
      throw new InternalServerErrorException("Email Already Exist")
    if (await this.userService.checkUsername(vetRegisterDTO.user.username))
      throw new InternalServerErrorException("Username Already Exist")
    return this.userService.vetRegister(vetRegisterDTO.user, vetRegisterDTO.vet);
  }

  @Throttle({ default: { ttl: 60000, limit: 5 } })
  @Post('login')
  login(@Body('username') username: string, @Body('password') password: string): Promise<{ access_token: AccessTokenDTO; user: UserModel }> {
    if (!username || !password)
      throw new UnauthorizedException("Username and Password are Required")
    return this.userService.login(username, password);
  }

  // @SkipThrottle({short: true, default: true, long: true})
  @Get('vets')
  getVets(): Promise<VetDTO[]> {
    return this.userService.getVets()
  }
}