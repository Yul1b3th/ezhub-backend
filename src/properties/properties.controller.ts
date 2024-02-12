import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Header,
} from '@nestjs/common';

import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';

import { Auth } from 'src/auth/decorators/auth.decorator';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { Role } from 'src/common/enums/rol.enum';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';

@Auth(Role.USER)
@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Post()
  @HttpCode(201)
  @Header('Content-Type', 'application/json')
  create(
    @Body() createPropertyDto: CreatePropertyDto,
    @ActiveUser() user: UserActiveInterface,
  ) {
    return this.propertiesService.create(createPropertyDto, user);
  }

  @Get()
  @Header('Content-Type', 'application/json')
  findAll(@ActiveUser() user: UserActiveInterface) {
    return this.propertiesService.findAll(user);
  }

  @Get(':id')
  @Header('Content-Type', 'application/json')
  findOne(@Param('id') id: number, @ActiveUser() user: UserActiveInterface) {
    return this.propertiesService.findOne(id, user);
  }

  @Patch(':id')
  @Header('Content-Type', 'application/json')
  update(
    @Param('id') id: number,
    @Body() updatePropertyDto: UpdatePropertyDto,
    @ActiveUser() user: UserActiveInterface,
  ) {
    return this.propertiesService.update(id, updatePropertyDto, user);
  }

  @Delete(':id')
  @HttpCode(200)
  remove(@Param('id') id: number, @ActiveUser() user: UserActiveInterface) {
    return this.propertiesService.remove(id, user);
  }
}
