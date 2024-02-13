import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AmenityService } from './amenity.service';
import { AmenityController } from './amenity.controller';
import { Amenity } from './entities/amenity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Amenity])],
  providers: [AmenityService],
  controllers: [AmenityController],
  exports: [AmenityService],
})
export class AmenityModule {}
