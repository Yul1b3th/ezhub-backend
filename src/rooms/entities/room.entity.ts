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
  IsDateString,
  IsNotEmpty,
  IsNumber,
  Length,
} from 'class-validator';

import { Property } from '../../properties/entities/property.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';
import { Favorite } from '../../favorites/entities/favorite.entity';
import { BedType } from '../enums/bed-type.enum';

import { RoomAmenity } from '../../room-amenity/entities/room-amenity.entity';

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

  @Column({
    type: 'enum',
    enum: BedType,
  })
  bed_type: BedType;

  @Column()
  @IsDateString()
  available_from: string;

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

  @Column()
  propertyId: number;

  @OneToMany(() => Transaction, (transaction) => transaction.room)
  transactions: Transaction[];

  @OneToMany(() => Favorite, (favorite) => favorite.room)
  favorites: Favorite[];

  @Column()
  userEmail: string;

  @OneToMany(() => RoomAmenity, (roomAmenity) => roomAmenity.room)
  roomAmenities: RoomAmenity[];

  /* @Column()
  @Length(0, 500)
  amenityIds: string; */
}
