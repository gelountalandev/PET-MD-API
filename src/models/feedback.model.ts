import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ConsultationModel } from './consultation.model';

@Entity({ name: 'feedback' })
export class FeedbackModel {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int', nullable: false })
  consultation_id: number;

  @Column({ type: 'varchar', nullable: false })
  rating: string;

  @Column({ type: 'varchar', nullable: true })
  comment: string;

  @Column({ type: 'timestamp', nullable: false })
  created_at: Date;

  @OneToOne(() => ConsultationModel)
  @JoinColumn({ name: 'consultation_id' })
  consultation: ConsultationModel
}
