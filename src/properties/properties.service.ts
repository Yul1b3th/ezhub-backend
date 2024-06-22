import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Property } from './entities/property.entity';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { UserActiveInterface } from '../common/interfaces/user-active.interface';
import { Role } from '../common/enums/rol.enum';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(Property)
    private propertiesRepository: Repository<Property>,
  ) {}

  async create(
    createPropertyDto: CreatePropertyDto,
    user: UserActiveInterface,
  ): Promise<Property> {
    return this.propertiesRepository.save({
      ...createPropertyDto,
      userEmail: user.email,
    });
  }

  // CRUD
  async findAll(user: UserActiveInterface): Promise<Property[]> {
    if (user.role === Role.ADMIN) {
      return await this.propertiesRepository.find();
    }
    return await this.propertiesRepository.find({
      where: { userEmail: user.email },
    });
  }

  async findOne(id: number, user: UserActiveInterface) {
    const property = await this.propertiesRepository.findOneBy({ id });
    if (!property) {
      throw new BadRequestException('Property not found');
    }
    this.validateOwnership(property, user);
    return property;
  }

  async update(
    id: number,
    updatePropertyDto: UpdatePropertyDto,
    user: UserActiveInterface,
  ) {
    await this.findOne(id, user);
    await this.propertiesRepository.update(id, {
      ...updatePropertyDto,
      userEmail: user.email,
    });
    return this.findOne(id, user);
  }

  /* async remove(id: number, user: UserActiveInterface): Promise<string> {
    await this.findOne(id, user);
    await this.propertiesRepository.softDelete({ id });
    return `Property with ID ${id} has been deleted`;
  } */

  async remove(id: number, user: UserActiveInterface): Promise<void> {
    const property = await this.findOne(id, user);
    await this.propertiesRepository.softDelete(property.id);
  }

  private validateOwnership(property: Property, user: UserActiveInterface) {
    if (user.role !== Role.ADMIN && property.userEmail !== user.email) {
      throw new UnauthorizedException();
    }
  }
}
