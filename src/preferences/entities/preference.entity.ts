import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  DeleteDateColumn,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';

@Entity()
export class Preference {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'boolean', default: false })
  internet: boolean;

  @Column({ type: 'boolean', default: false })
  washer: boolean;

  @Column({ type: 'boolean', default: false })
  dryer: boolean;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToOne(() => User, (user) => user.preference)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
