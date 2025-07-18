import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PetOwnerModel } from '../../models/pet_owner.model';
import { UserModel } from '../../models/user.model';
import { USER_TYPE } from '../../app.constants';
import { UserDTO, PetOwnerDTO } from './dto/pet-owner-register.dto';
import { VetDTO } from './dto/vet-register.dto';
import { VetModel } from '../../models/vet.model';
import { AccessTokenModel } from '../../models/access_token.model';
import * as crypto from 'crypto';
import { hashPassword } from '../../utils/bcrypt';
import { comparePassword } from '../../utils/bcrypt';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(PetOwnerModel)
    private readonly petOwnerRepository: Repository<PetOwnerModel>,
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    @InjectRepository(VetModel)
    private readonly vetRepository: Repository<VetModel>,
    @InjectRepository(AccessTokenModel)
    private readonly accessTokenRepository: Repository<AccessTokenModel>,
  ) { }

  async petOwnerRegister(userModel: UserDTO, petOwnerModel: PetOwnerDTO): Promise<PetOwnerModel> {
    const queryRunner = this.userRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const password = hashPassword(userModel.password)
      const user = queryRunner.manager.getRepository(UserModel).create({ ...userModel, password, user_type: USER_TYPE.PET_OWNER });
      const savedUser = await queryRunner.manager.getRepository(UserModel).save(user);

      const petOwner = queryRunner.manager.getRepository(PetOwnerModel).create({ ...petOwnerModel, user_id: savedUser.id, created_at: new Date() });
      const savedPetOwner = await queryRunner.manager.getRepository(PetOwnerModel).save(petOwner);

      await queryRunner.commitTransaction();
      return savedPetOwner;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('Failed to Register Pet Owner');
    } finally {
      await queryRunner.release();
    }
  }

  async vetRegister(userModel: UserDTO, vetModel: VetDTO): Promise<VetModel> {
    const queryRunner = this.userRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const password = hashPassword(userModel.password)
      const user = queryRunner.manager.getRepository(UserModel).create({ ...userModel, password, user_type: USER_TYPE.VET });
      const savedUser = await queryRunner.manager.getRepository(UserModel).save(user)

      const vet = queryRunner.manager.getRepository(VetModel).create({ ...vetModel, user_id: savedUser.id });
      const savedVet = await queryRunner.manager.getRepository(VetModel).save(vet);

      await queryRunner.commitTransaction();
      return savedVet;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('Failed to Register Vet');
    } finally {
      await queryRunner.release();
    }
  }

  async login(username: string, password: string): Promise<{ access_token: AccessTokenModel, user: UserModel }> {
    try {
      const user = await this.userRepository.findOne({ where: { username: username } })
      if (!user)
        throw new NotFoundException('Invalid username');
      const validPassword = await comparePassword(password, user.password!)
      if (!validPassword)
        throw new NotFoundException('Invalid password');

      if (user.user_type === USER_TYPE.PET_OWNER) {
        const petowner = await this.petOwnerRepository.findOne({ where: { user_id: user.id } })
        if (!petowner)
          throw new NotFoundException('Pet owner not found');
        const access_token = await this.createAccessToken(petowner.user_id);
        return { access_token, user };
      } else if (user.user_type === USER_TYPE.VET) {
        const vetowner = await this.vetRepository.findOne({ where: { user_id: user.id } });
        if (!vetowner)
          throw new NotFoundException('Vet owner not found');
        const access_token = await this.createAccessToken(vetowner.user_id);
        return { access_token, user };
      } else {
        throw new NotFoundException('Unknown user type');
      }
    } catch (error) {
      throw new InternalServerErrorException('Login Failed');
    }
  }

  async createAccessToken(user_id: number): Promise<AccessTokenModel> {
    const newToken = crypto.randomBytes(16).toString('hex');
    const expires_at = new Date(Date.now()+ 60 * 60 * 100)
    const accessToken = this.accessTokenRepository.create({ token: newToken, user_id: user_id, created_at: new Date(), expires_at:expires_at });
    return await this.accessTokenRepository.save(accessToken);
  }

  async getVets(): Promise<VetModel[]> {
    return this.vetRepository
      .createQueryBuilder('vet')
      .leftJoinAndSelect('vet.user', 'user')
      .getMany();
  }

  async checkEmail(email: string): Promise<boolean> {
    const emailExist = await this.userRepository.findOne({ where: { email } });
    return !!emailExist
  }

  async checkUsername(username: string): Promise<boolean> {
    const usernameExist = await this.userRepository.findOne({ where: { username } })
    return !!usernameExist
  }

  async checkPetOwner(id: number): Promise<PetOwnerModel | null> {
    return await this.petOwnerRepository
      .createQueryBuilder('pet_owner')
      .innerJoin('pet_owner.user', 'user')
      .where('pet_owner.user_id = :id', { id })
      .andWhere('user.user_type = :user_type', { user_type: USER_TYPE.PET_OWNER })
      .getOne();
  }

  async petOwnerCheck(pet_owner_id: number): Promise<boolean> {
    const pet_owner_check = await this.petOwnerRepository.findOne({ where: { id: pet_owner_id } });
    return !!pet_owner_check
  }

  async vetCheck(vet_id: number): Promise<boolean> {
    const vet_check = await this.vetRepository.findOne({ where: { id: vet_id } });
    return !!vet_check;
  }

  async validToken(token:string): Promise<AccessTokenModel | null> {
    const checkToken = await this.accessTokenRepository.findOne({where: {token: token}});
    return checkToken
  }

  async logout(user_id: number, token: string): Promise<void> {
  await this.accessTokenRepository.delete({ user_id, token });
}
}