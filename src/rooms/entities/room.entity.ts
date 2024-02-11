import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  Length,
} from 'class-validator';

import { Property } from '../../properties/entities/property.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';
import { Favorite } from '../../favorites/entities/favorite.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @IsNotEmpty()
  @Length(4, 50)
  name: string;

  @Column()
  @Length(4, 500)
  details: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  @IsNotEmpty()
  @IsNumber()
  precio: number;

  @Column()
  @IsNotEmpty()
  @IsBoolean()
  is_available: boolean;

  @Column()
  @IsNumber()
  room_size: number;

  @Column()
  @IsNotEmpty()
  @Length(1, 50)
  bed_type: string;

  @Column()
  @Length(0, 500)
  amenities: string;

  @Column()
  @IsNotEmpty()
  @IsDate()
  available_from: Date;

  @Column()
  @IsBoolean()
  utilities_included: boolean;

  @Column()
  @IsBoolean()
  deposit_required: boolean;

  @Column()
  @Length(0, 500)
  services_included: string;

  @Column('text')
  @Length(0, 5000)
  photos: string;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Property, (property) => property.rooms)
  property: Property;

  @OneToMany(() => Transaction, (transaction) => transaction.room)
  transactions: Transaction[];

  @OneToMany(() => Favorite, (favorite) => favorite.room)
  favorites: Favorite[];
}
