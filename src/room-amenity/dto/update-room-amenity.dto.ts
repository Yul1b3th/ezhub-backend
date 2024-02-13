import { PartialType } from '@nestjs/mapped-types';
import { CreateRoomAmenityDto } from './create-room-amenity.dto';

export class UpdateRoomAmenityDto extends PartialType(CreateRoomAmenityDto) {}
