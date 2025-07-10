import { Module } from '@nestjs/common';
import { FeedbackController } from './feedback.controller';
import { FeedbackService } from './feedback.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbackModel } from '../../models/feedback.model';
import  { ConsultationModule } from '../consultation/consultation.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FeedbackModel,
    ]),
    ConsultationModule,
  ],
  controllers: [FeedbackController],
  providers: [FeedbackService],
})
export class FeedbackModule { }
