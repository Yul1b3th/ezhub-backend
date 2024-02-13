import {
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
  Entity,
  DeleteDateColumn,
} from 'typeorm';

import { IsNotEmpty, IsNumber, Length } from 'class-validator';

import { Room } from '../../rooms/entities/room.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Property {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @IsNotEmpty()
  @Length(4, 50)
  name: string;

  @Column()
  @Length(4, 500)
  details: string;

  @Column()
  @Length(4, 300)
  address: string;

  @Column()
  @IsNotEmpty()
  @Length(4, 50)
  city: string;

  @Column({ default: 'España' })
  @IsNotEmpty()
  @Length(4, 50)
  country: string;

  @Column('decimal', { precision: 10, scale: 7 })
  latitude: number;

  @Column('decimal', { precision: 10, scale: 7 })
  longitude: number;

  @Column()
  @IsNumber()
  bedrooms: number;

  @Column()
  @IsNumber()
  bathrooms: number;

  @Column()
  @IsNumber()
  property_size: number;

  @Column({ default: false })
  smoking_allowed: boolean;

  @Column({ default: false })
  pets_allowed: boolean;

  @Column({ default: false })
  couples_allowed: boolean;

  @Column()
  @IsNumber()
  occupantCount: number;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Room, (room) => room.property, { eager: true })
  rooms: Room[];

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userEmail', referencedColumnName: 'email' })
  user: User;

  @Column()
  userEmail: string;
}
