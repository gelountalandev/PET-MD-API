import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { USER_TYPE } from '../app.constants';

@Entity({ name: 'user' })
export class UserModel {
  @PrimaryGeneratedColumn({ type: 'int' })
  id?: number;

  @Column({ type: 'varchar', nullable: false })
  email?: string;

  @Column({ type: 'varchar', nullable: false })
  username?: string;

  @Column({ type: 'varchar', nullable: false })
  password?: string;

  @Column({ type: 'enum', enum: USER_TYPE, nullable: false })
  user_type?: USER_TYPE;
}
