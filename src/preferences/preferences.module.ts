import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PreferencesService } from './preferences.service';
import { PreferencesController } from './preferences.controller';
import { Preference } from './entities/preference.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Preference, User])],
  controllers: [PreferencesController],
  providers: [PreferencesService],
})
export class PreferencesModule {}
