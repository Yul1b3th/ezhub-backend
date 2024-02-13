import { Injectable } from '@nestjs/common';
import { CreateRoomAmenityDto } from './dto/create-room-amenity.dto';
import { UpdateRoomAmenityDto } from './dto/update-room-amenity.dto';

@Injectable()
export class RoomAmenityService {
  create(createRoomAmenityDto: CreateRoomAmenityDto) {
    return 'This action adds a new roomAmenity';
  }

  findAll() {
    return `This action returns all roomAmenity`;
  }

  findOne(id: number) {
    return `This action returns a #${id} roomAmenity`;
  }

  update(id: number, updateRoomAmenityDto: UpdateRoomAmenityDto) {
    return `This action updates a #${id} roomAmenity`;
  }

  remove(id: number) {
    return `This action removes a #${id} roomAmenity`;
  }
}
