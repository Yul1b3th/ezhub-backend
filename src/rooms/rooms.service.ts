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
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private roomsRepository: Repository<Room>,
    @InjectRepository(RoomAmenity)
    private roomAmenityRepository: Repository<RoomAmenity>,
    @InjectRepository(Amenity)
    private amenityRepository: Repository<Amenity>,
  ) {}

  async create(
    createRoomDto: CreateRoomDto,
    user: UserActiveInterface,
  ): Promise<Room> {
    const room = await this.roomsRepository.save({
      ...createRoomDto,
      userEmail: user.email,
    });

    if (createRoomDto.amenityIds) {
      for (const amenityId of createRoomDto.amenityIds) {
        const amenity = await this.amenityRepository.findOne({
          where: { id: amenityId },
        });

        if (!amenity) {
          throw new BadRequestException(
            `Amenity with ID ${amenityId} not found`,
          );
        }

        const roomAmenity = this.roomAmenityRepository.create({
          room,
          amenity,
        });

        await this.roomAmenityRepository.save(roomAmenity);
      }
    }

    return this.roomsRepository.findOne({
      where: { id: room.id },
      relations: ['roomAmenities', 'roomAmenities.amenity'],
    });
  }

  async findAll(user: UserActiveInterface): Promise<Room[]> {
    if (user.role === Role.ADMIN) {
      return await this.roomsRepository.find();
    }
    return await this.roomsRepository.find({
      where: { userEmail: user.email },
    });
  }

  async findOne(id: number, user: UserActiveInterface) {
    const room = await this.roomsRepository.findOneBy({ id });
    if (!room) {
      throw new BadRequestException(`Room with ID ${id} not found`);
    }
    this.validateOwnership(room, user);
    return room;
  }

  async update(
    id: number,
    updateRoomDto: UpdateRoomDto,
    user: UserActiveInterface,
  ) {
    const room = await this.findOne(id, user);

    // Primero, actualiza las propiedades normales de la habitación
    const { amenityIds, ...roomData } = updateRoomDto;
    await this.roomsRepository.update(id, {
      ...roomData,
      userEmail: user.email,
    });

    // Luego, maneja la actualización de las amenidades
    if (amenityIds) {
      const currentAmenityIds = await this.getCurrentAmenityIds(room);

      // Si los IDs de las amenidades no han cambiado, omite la actualización de las amenidades
      if (!this.arraysAreEqual(amenityIds, currentAmenityIds)) {
        // Elimina todas las RoomAmenity existentes para esta habitación
        await this.roomAmenityRepository.delete({ room });

        // Crea nuevas RoomAmenity para cada ID de amenidad
        for (const amenityId of amenityIds) {
          const amenity = await this.amenityRepository.findOne({
            where: { id: amenityId },
          });

          if (!amenity) {
            throw new BadRequestException(
              `Amenity with ID ${amenityId} not found`,
            );
          }

          const roomAmenity = this.roomAmenityRepository.create({
            room,
            amenity,
          });

          await this.roomAmenityRepository.save(roomAmenity);
        }
      }
    }

    return this.findOne(id, user);
  }

  async remove(id: number, user: UserActiveInterface): Promise<void> {
    const room = await this.findOne(id, user);
    await this.roomsRepository.softDelete(room.id);
  }

  private validateOwnership(room: Room, user: UserActiveInterface) {
    if (user.role !== Role.ADMIN && room.userEmail !== user.email) {
      throw new UnauthorizedException();
    }
  }

  // Método para comparar dos arrays
  private arraysAreEqual(a: number[], b: number[]): boolean {
    return (
      a.length === b.length &&
      a.sort().every((value, index) => value === b.sort()[index])
    );
  }

  private async getCurrentAmenityIds(room: Room): Promise<number[]> {
    const roomAmenities = await this.roomAmenityRepository.find({
      where: { room },
      relations: ['amenity'],
    });

    return roomAmenities.map((roomAmenity) => roomAmenity.amenity.id);
  }
}
