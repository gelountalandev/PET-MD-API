import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConsultationModel } from '../../models/consultation.model';
import { Repository } from 'typeorm';
import { ConsultationDTO } from './dto/consultation.dto';

@Injectable()
export class ConsultationService {
  constructor(
    @InjectRepository(ConsultationModel)
    private readonly consultationRepository: Repository<ConsultationModel>,
  ) { }

  async createConsultation(consultationDTO: ConsultationDTO): Promise<ConsultationModel> {
    const savedConsultation = this.consultationRepository.create({ ...consultationDTO, created_at: new Date() })
    return await this.consultationRepository.save(savedConsultation)
  }

  async getConsultations(): Promise<ConsultationModel[]> {
    return this.consultationRepository.find()
  }

  async getConsultation(id: number): Promise<ConsultationModel | null> {
    return await this.consultationRepository.findOne({ where: { id: id } })
  }

  async findOne(id: number): Promise<boolean> {
    const findOne = await this.consultationRepository.findOne({ where: { id } })
    return !!findOne
  }

  async findConsultation(id: number): Promise<ConsultationModel | null> {
    return await this.consultationRepository.findOne({ where: { id: id } })
  }
}