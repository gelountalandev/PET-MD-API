import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { UserModel } from './user.model';

@Entity({ name: 'pet_owner' })
export class PetOwnerModel {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int', nullable: false })
  user_id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'int', nullable: false })
  contact_number: number;

  @Column({ type: 'varchar', nullable: false })
  address: string;

  @Column({ type: 'timestamp', nullable: false })
  created_at: Date;

  @OneToOne(() => UserModel)
  @JoinColumn({ name: 'user_id' })
  user: UserModel;

}
