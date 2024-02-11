import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  DeleteDateColumn,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';
import { Room } from '../../rooms/entities/room.entity';

@Entity()
export class Favorite {
  @PrimaryGeneratedColumn()
  id: number;

  name: string;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.favorites)
  user: User;

  @ManyToOne(() => Room, (room) => room.favorites)
  room: Room;
}
