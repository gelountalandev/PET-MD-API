import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AppointmentModel } from './appointment.model';

@Entity({ name: 'consultation' })
export class ConsultationModel {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int', nullable: false })
  appointment_id: number;

  @Column({ type: 'varchar', nullable: true })
  notes: string;

  @Column({ type: 'varchar', nullable: true })
  prescription: string;

  @Column({ type: 'varchar', nullable: false })
  duration: string;

  @Column({ type: 'timestamp', nullable: false })
  created_at: Date;

  @OneToOne(() => AppointmentModel)
  @JoinColumn({ name: 'appointment_id' })
  appointment: AppointmentModel;
}
