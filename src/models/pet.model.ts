import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'pet' })
export class PetModel {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int', nullable: false })
  user_id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  breed: string;

  @Column({ type: 'varchar', nullable: true })
  species: string;

  @Column({ type: 'timestamp', nullable: true })
  birth_date: Date;

  @Column({ type: 'varchar', nullable: true })
  gender: string;

  @Column({ type: 'varchar', nullable: true })
  weight: string;

  @Column({ type: 'timestamp', nullable: true })
  created_at: Date;
}
