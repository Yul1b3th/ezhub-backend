import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Amenity } from './entities/amenity.entity';
import { CreateAmenityDto } from './dto/create-amenity.dto';
import { UpdateAmenityDto } from './dto/update-amenity.dto';

@Injectable()
export class AmenityService {
  constructor(
    @InjectRepository(Amenity)
    private amenityRepository: Repository<Amenity>,
  ) {}

  async create(createAmenityDto: CreateAmenityDto): Promise<Amenity> {
    const amenity = this.amenityRepository.create(createAmenityDto);
    return this.amenityRepository.save(amenity);
  }

  findAll(): Promise<Amenity[]> {
    return this.amenityRepository.find();
  }

  findOne(id: number): Promise<Amenity> {
    return this.amenityRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateAmenityDto: UpdateAmenityDto,
  ): Promise<Amenity> {
    await this.amenityRepository.update(id, updateAmenityDto);
    return this.amenityRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.amenityRepository.delete(id);
  }
}
