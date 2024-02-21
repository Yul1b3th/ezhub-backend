import { Controller, Get, Param } from '@nestjs/common';

import { PublicRoomsService } from './public-rooms.service';

@Controller('public-rooms')
export class PublicRoomsController {
  constructor(private readonly roomsService: PublicRoomsService) {}

  @Get()
  findAll() {
    return this.roomsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.roomsService.findOne(id);
  }

  @Get(':id/amenities')
  findAmenities(@Param('id') id: number) {
    return this.roomsService.findAmenities(id);
  }
}
