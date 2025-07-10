import { Module } from '@nestjs/common';
import { UserController } from '../user/user.controller';
import { UserService } from '../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from '../../models/user.model';
import { PetOwnerModel } from '../../models/pet_owner.model';
import { VetModel } from '../../models/vet.model';
import { PetModel } from '../../models/pet.model';
import { AccessTokenModel } from '../../models/access_token.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserModel,
      PetOwnerModel,
      VetModel,
      PetModel,
      AccessTokenModel,
    ])
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule { }