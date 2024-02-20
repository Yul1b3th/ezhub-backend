import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PropertiesService } from './properties.service';
import { PropertiesController } from './properties.controller';
import { Property } from './entities/property.entity';
import { RoomsModule } from '../rooms/rooms.module';
import { RoomsService } from '../rooms/rooms.service';
import { AuthModule } from '../auth/auth.module';
import { PublicPropertiesService } from './public-properties.service';
import { PublicPropertiesController } from './public-properties.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Property]), RoomsModule, AuthModule],
  controllers: [PropertiesController, PublicPropertiesController],
  providers: [PropertiesService, RoomsService, PublicPropertiesService],
})
export class PropertiesModule {}
