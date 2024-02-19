import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { Room } from './entities/room.entity';
import { Transaction } from '../transactions/entities/transaction.entity';
import { Favorite } from '../favorites/entities/favorite.entity';
import { AuthModule } from '../auth/auth.module';
import { RoomAmenity } from '../room-amenity/entities/room-amenity.entity';
import { Amenity } from '../amenity/entities/amenity.entity'; // importa Amenity
import { AmenityModule } from '../amenity/amenity.module'; // importa AmenityModule
import { PublicRoomsService } from './public-rooms.service';
import { PublicRoomsController } from './public-rooms.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Room,
      Transaction,
      Favorite,
      RoomAmenity,
      Amenity,
    ]),
    AuthModule,
    AmenityModule,
  ],
  controllers: [RoomsController, PublicRoomsController],
  providers: [RoomsService, PublicRoomsService],
  exports: [TypeOrmModule],
})
export class RoomsModule {}
