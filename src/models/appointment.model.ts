import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { PetOwnerModel } from './pet_owner.model';
import { VetModel } from './vet.model';

@Entity({ name: 'appointment' })
export class AppointmentModel {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int', nullable: false })
  pet_owner_id: number;

  @Column({ type: 'int', nullable: false })
  vet_id: number;

  @Column({ type: 'timestamp', nullable: false })
  schedule_time: Date;

  @Column({ type: 'varchar', nullable: false })
  consultation_type: string;

  @Column({ type: 'varchar', nullable: false })
  status: string;

  @Column({ type: 'timestamp', nullable: true })
  started_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  ended_at: Date;

  @Column({ type: 'timestamp', nullable: false })
  created_at: Date;

  @ManyToOne(() => PetOwnerModel)
  @JoinColumn({ name: 'pet_owner_id' })
  petOwner: PetOwnerModel;

  @ManyToOne(() => VetModel)
  @JoinColumn({ name: 'vet_id' })
  vet: VetModel;
}
