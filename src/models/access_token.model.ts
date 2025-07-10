import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from "typeorm";
import { UserModel } from "./user.model";

@Entity({ name: 'access_token' })
export class AccessTokenModel {
  @PrimaryGeneratedColumn('uuid')
  token: string;

  @Column({ type: 'int', nullable: false })
  user_id: number;

  @Column({ type: 'timestamp', nullable: false })
  created_at: Date;

  @ManyToOne(() => UserModel)
  @JoinColumn({ name: 'user_id' })
  user: UserModel;
}