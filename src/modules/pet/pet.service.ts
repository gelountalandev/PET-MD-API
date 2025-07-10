import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PetModel } from '../../models/pet.model';
import { PetDTO } from './dto/pet-register.dto';
import { PetUpdateDTO } from './dto/pet-update.dto';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(PetModel)
    private readonly petRepository: Repository<PetModel>,
  ) { }

  async createPet(petDTO: PetDTO): Promise<PetModel> {
    const pet = this.petRepository.create({ ...petDTO, created_at: new Date() });
    return await this.petRepository.save(pet)
  }

  async getPets(): Promise<PetModel[]> {
    return await this.petRepository.find();
  }

  async getPet(id: number): Promise<PetModel | null> {
    return await this.petRepository.findOne({ where: { id } });
  }

  async updatePet(id: number, petUpdateDTO: PetUpdateDTO): Promise<PetModel | null> {
    await this.petRepository.update(id, { ...petUpdateDTO })
    return await this.petRepository.findOne({ where: { id: id } })
  }

  async deletePet(id: number): Promise<void> {
    await this.petRepository.delete({ id })
  }

  async findOne(id: number): Promise<boolean> {
    const findOne = await this.petRepository.findOne({ where: { id } })
    return !!findOne
  }
}