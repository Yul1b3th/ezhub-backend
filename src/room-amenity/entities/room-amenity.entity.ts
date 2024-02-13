import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { Amenity } from '../../amenity/entities/amenity.entity';
import { Room } from '../../rooms/entities/room.entity';

@Entity()
export class RoomAmenity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Room, (room) => room.roomAmenities, { onDelete: 'CASCADE' })
  room: Room;

  @ManyToOne(() => Amenity, (amenity) => amenity.roomAmenities, {
    onDelete: 'CASCADE',
  })
  amenity: Amenity;
}
