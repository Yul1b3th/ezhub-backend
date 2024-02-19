import {
  BadRequestException,
  Injectable,
  Param,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Room } from './entities/room.entity';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { UserActiveInterface } from '../common/interfaces/user-active.interface';
import { Role } from '../common/enums/rol.enum';
import { RoomAmenity } from '../room-amenity/entities/room-amenity.entity';
import { Amenity } from '../amenity/entities/amenity.entity';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';

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
}
