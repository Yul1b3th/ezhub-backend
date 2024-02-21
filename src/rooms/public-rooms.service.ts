import { BadRequestException, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Room } from './entities/room.entity';
import { RoomAmenity } from '../room-amenity/entities/room-amenity.entity';
import { Amenity } from '../amenity/entities/amenity.entity';

@Injectable()
export class PublicRoomsService {
  constructor(
    @InjectRepository(Room)
    private roomsRepository: Repository<Room>,
    @InjectRepository(RoomAmenity)
    private roomAmenityRepository: Repository<RoomAmenity>,
    @InjectRepository(Amenity)
    private amenityRepository: Repository<Amenity>,
  ) {}

  async findAll(): Promise<Room[]> {
    return await this.roomsRepository.find();
  }

  async findOne(id: number) {
    const room = await this.roomsRepository.findOneBy({ id });
    if (!room) {
      throw new BadRequestException(`Room with ID ${id} not found`);
    }
    return room;
  }
  async findAmenities(roomId: number): Promise<Amenity[]> {
    const roomAmenities = await this.roomAmenityRepository.find({
      where: { room: { id: roomId } },
      relations: ['amenity'],
    });
    return roomAmenities.map((ra) => ra.amenity);
  }
}
