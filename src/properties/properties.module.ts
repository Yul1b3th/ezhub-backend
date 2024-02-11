import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PropertiesService } from './properties.service';
import { PropertiesController } from './properties.controller';
import { Property } from './entities/property.entity';
import { RoomsModule } from '../rooms/rooms.module';
import { RoomsService } from '../rooms/rooms.service';

@Module({
  imports: [TypeOrmModule.forFeature([Property]), RoomsModule],
  controllers: [PropertiesController],
  providers: [PropertiesService, RoomsService],
})
export class PropertiesModule {}
