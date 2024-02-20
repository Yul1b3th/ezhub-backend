import { Controller, Get, Param } from '@nestjs/common';

import { PublicPropertiesService } from './public-properties.service';

@Controller('public-properties')
export class PublicPropertiesController {
  constructor(
    private readonly publicPropertiesService: PublicPropertiesService,
  ) {}

  @Get()
  findAll() {
    return this.publicPropertiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.publicPropertiesService.findOne(id);
  }
}
