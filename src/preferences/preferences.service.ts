import { Injectable } from '@nestjs/common';
import { CreatePreferenceDto } from './dto/create-preference.dto';
import { UpdatePreferenceDto } from './dto/update-preference.dto';

@Injectable()
export class PreferencesService {
  create(createPreferenceDto: CreatePreferenceDto) {
    return 'This action adds a new preference';
  }

  findAll() {
    return `This action returns all preferences`;
  }

  findOne(id: number) {
    return `This action returns a #${id} preference`;
  }

  update(id: number, updatePreferenceDto: UpdatePreferenceDto) {
    return `This action updates a #${id} preference`;
  }

  remove(id: number) {
    return `This action removes a #${id} preference`;
  }
}
