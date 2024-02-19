import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsDate,
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

import { Transform } from 'class-transformer';
import { BedType } from '../enums/bed-type.enum';

export class CreateRoomDto {
  @Transform(({ value }) => value.trim())
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  @Length(4, 50, { message: 'Name must be between 4 and 20 characters' })
  name: string;

  @Transform(({ value }) => value.trim())
  @IsOptional()
  @IsString({ message: 'details must be a string' })
  @Length(4, 500, { message: 'details must be between 4 and 500 characters' })
  details?: string;

  @IsNotEmpty({ message: 'Precio is required' })
  @IsNumber()
  precio: number;

  @IsOptional()
  @IsBoolean()
  is_available?: boolean;

  @IsOptional()
  @IsNumber()
  room_size?: number;

  // @IsNotEmpty({ message: 'Bed type is required' })
  @IsEnum(BedType)
  bed_type?: BedType;

  /*   @Length(0, 500)
  amenityIds?: string; */

  @IsOptional()
  @IsArray()
  //@ArrayNotEmpty()
  amenityIds?: number[];

  @IsDateString()
  available_from?: string;

  @IsBoolean()
  utilities_included: boolean;

  @IsBoolean()
  deposit_required: boolean;

  @Length(0, 500)
  services_included: string;

  @Length(0, 5000)
  photos: string;

  @IsNotEmpty({ message: 'Propertyed type is required' })
  propertyId: number;
}
