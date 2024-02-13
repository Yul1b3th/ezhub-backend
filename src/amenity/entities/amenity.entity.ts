import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { RoomAmenity } from '../../room-amenity/entities/room-amenity.entity';

@Entity()
export class Amenity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => RoomAmenity, (roomAmenity) => roomAmenity.amenity)
  roomAmenities: RoomAmenity[];
}
