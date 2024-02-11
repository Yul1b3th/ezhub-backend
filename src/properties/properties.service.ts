import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Property } from './entities/property.entity';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(Property)
    private propertiesRepository: Repository<Property>,
  ) {}

  async create(createPropertyDto: CreatePropertyDto): Promise<Property> {
    const newProperty = this.propertiesRepository.create(createPropertyDto);
    return this.propertiesRepository.save(newProperty);
  }

  // CRUD
  async findAll(): Promise<Property[]> {
    return this.propertiesRepository.find();
  }

  async findOne(id: number): Promise<Property> {
    const property = await this.propertiesRepository.findOneBy({ id });
    if (!property) {
      throw new BadRequestException('Property not found');
    }
    return property;
  }

  async update(
    id: number,
    updatePropertyDto: UpdatePropertyDto,
  ): Promise<Property> {
    await this.findOne(id);
    await this.propertiesRepository.update(id, { ...updatePropertyDto });
    return this.findOne(id);
  }

  async remove(id: number): Promise<string> {
    await this.findOne(id);
    await this.propertiesRepository.softDelete({ id });
    return `Property with ID ${id} has been deleted`;
  }
}
