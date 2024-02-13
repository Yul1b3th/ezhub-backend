import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoomAmenityService } from './room-amenity.service';
import { CreateRoomAmenityDto } from './dto/create-room-amenity.dto';
import { UpdateRoomAmenityDto } from './dto/update-room-amenity.dto';

@Controller('room-amenity')
export class RoomAmenityController {
  constructor(private readonly roomAmenityService: RoomAmenityService) {}

  @Post()
  create(@Body() createRoomAmenityDto: CreateRoomAmenityDto) {
    return this.roomAmenityService.create(createRoomAmenityDto);
  }

  @Get()
  findAll() {
    return this.roomAmenityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomAmenityService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomAmenityDto: UpdateRoomAmenityDto) {
    return this.roomAmenityService.update(+id, updateRoomAmenityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomAmenityService.remove(+id);
  }
}
