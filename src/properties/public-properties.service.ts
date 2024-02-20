import { BadRequestException, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Property } from './entities/property.entity';

@Injectable()
export class PublicPropertiesService {
  constructor(
    @InjectRepository(Property)
    private propertiesRepository: Repository<Property>,
  ) {}

  async findAll(): Promise<Property[]> {
    return await this.propertiesRepository.find();
  }

  async findOne(id: number) {
    const property = await this.propertiesRepository.findOneBy({ id });
    if (!property) {
      throw new BadRequestException('Property not found');
    }
    return property;
  }
}
