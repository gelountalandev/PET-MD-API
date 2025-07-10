import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedbackModel } from '../../models/feedback.model';
import { Repository } from 'typeorm';
import { FeedbackDTO } from './dto/feedback.dto';


@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(FeedbackModel)
    private readonly feedbackRepository: Repository<FeedbackModel>,
  ) { }

  async createFeedback(feedbackDTO: FeedbackDTO): Promise<FeedbackModel> {
    const feedback = this.feedbackRepository.create({ ...feedbackDTO, created_at: new Date() })
    return await this.feedbackRepository.save(feedback)
  }

  async getFeedbacks(): Promise<FeedbackModel[]> {
    return await this.feedbackRepository.find()
  }
}