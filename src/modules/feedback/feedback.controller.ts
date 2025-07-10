import { Body, Controller, Post, ValidationPipe, Get, NotFoundException } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackDTO } from './dto/feedback.dto';
import { ConsultationService } from '../consultation/consultation.service';

@Controller('feedback')
export class FeedbackController {
  constructor(
    private readonly feedbackService: FeedbackService,
    private readonly consultationService: ConsultationService,
  ) { }

  @Post()
  async createFeedback(@Body(ValidationPipe) feedbackDTO: FeedbackDTO): Promise<FeedbackDTO> {
    if (!await this.consultationService.findConsultation(feedbackDTO.consultation_id))
      throw new NotFoundException("Consultation Not Found")
    return this.feedbackService.createFeedback(feedbackDTO)
  }

  @Get()
  getFeedbacks(): Promise<FeedbackDTO[]> {
    return this.feedbackService.getFeedbacks()
  }
}