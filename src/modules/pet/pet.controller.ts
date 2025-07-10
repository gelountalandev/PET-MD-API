import { Controller, Post, Get, Param, ParseIntPipe, ValidationPipe, Body, Delete, Patch, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PetService } from './pet.service';
import { PetDTO } from './dto/pet-register.dto';
import { PetUpdateDTO } from './dto/pet-update.dto';
import { UserService } from '../user/user.service';

@Controller('pets')
export class PetController {
  constructor(
    private readonly petService: PetService,
    private readonly userService: UserService,
  ) { }

  @Post()
  async createPet(@Body(ValidationPipe) petDTO: PetDTO): Promise<PetDTO> {
    if (!petDTO.user_id || !(await this.userService.checkPetOwner(petDTO.user_id)))
      throw new InternalServerErrorException("Pet Owner Does Not Exist")
    return this.petService.createPet(petDTO)
  }

  @Get()
  getPets(): Promise<PetDTO[]> {
    return this.petService.getPets();
  }

  @Get(':id')
  async getPet(@Param('id', ParseIntPipe) id: number): Promise<PetDTO | null> {
    if (!await this.petService.findOne(id))
      throw new NotFoundException("Pet Not Found")
    return this.petService.getPet(id)
  }

  @Patch(':id')
  async updatePet(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) petUpdateDTO: PetUpdateDTO): Promise<PetDTO | null> {
    if (!(await this.petService.findOne(id)))
      throw new NotFoundException("Pet Not Found")
    return this.petService.updatePet(id, petUpdateDTO)
  }

  @Delete(':id')
  async deletePet(@Param('id', ParseIntPipe) id: number): Promise<void> {
    if (!await this.petService.findOne(id))
      throw new NotFoundException("Pet Not Found")
    return this.petService.deletePet(id)
  }
}