import { Module } from '@nestjs/common';
import { PetController } from '../pet/pet.controller';
import { PetService } from '../pet/pet.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetModel } from '../../models/pet.model';
import { VetModel } from '../../models/vet.model';
import { PetOwnerModel } from '../../models/pet_owner.model';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PetModel,
      VetModel,
      PetOwnerModel,
    ]),
    UserModule,
  ],
  controllers: [PetController],
  providers: [PetService],
  exports: [PetService]
})
export class PetModule { }
