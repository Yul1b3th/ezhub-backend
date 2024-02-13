import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoomAmenityService } from './room-amenity.service';
import { RoomAmenityController } from './room-amenity.controller';
import { RoomAmenity } from './entities/room-amenity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoomAmenity])],
  controllers: [RoomAmenityController],
  providers: [RoomAmenityService],
})
export class RoomAmenityModule {}
