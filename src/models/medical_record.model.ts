import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'medical_record' })
export class MedicalRecordModel {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int', nullable: false })
  pet_id: number;

  @Column({ type: 'int', nullable: false })
  vet_id: number;

  @Column({ type: 'varchar', nullable: true })
  prescription: string;

  @Column({ type: 'varchar', nullable: true })
  notes: string;

  @Column({ type: 'timestamp', nullable: false })
  created_at: Date;
}
