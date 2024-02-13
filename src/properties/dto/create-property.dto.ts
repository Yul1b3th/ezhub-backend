import {
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

import { Transform } from 'class-transformer';

export class CreatePropertyDto {
  @Transform(({ value }) => value.trim())
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  @Length(4, 50, { message: 'Name must be between 4 and 20 characters' })
  name: string;

  @Transform(({ value }) => value.trim())
  @IsOptional()
  @IsString({ message: 'details must be a string' })
  @Length(4, 500, { message: 'details must be between 4 and 300 characters' })
  details?: string;

  @Transform(({ value }) => value.trim())
  @IsOptional()
  @IsString({ message: 'Address must be a string' })
  @Length(4, 300, { message: 'Address must be between 4 and 300 characters' })
  address?: string;

  @Transform(({ value }) => value.trim())
  @IsNotEmpty({ message: 'city is required' })
  @IsString({ message: 'city must be a string' })
  @Length(4, 50, { message: 'city must be between 4 and 20 characters' })
  city: string;

  @Transform(({ value }) => value.trim())
  @IsNotEmpty({ message: 'country is required' })
  @Length(4, 50, { message: 'country must be between 4 and 20 characters' })
  country: string;

  //@IsNotEmpty({ message: 'Latitude is required' })
  @IsNumber()
  @IsLatitude()
  latitude: number;

  //@IsNotEmpty({ message: 'Longitude is required' })
  @IsNumber()
  @IsLongitude()
  longitude: number;

  @IsOptional()
  @IsNumber()
  bedrooms?: number;

  @IsOptional()
  @IsNumber()
  bathrooms?: number;

  @IsOptional()
  @IsNumber()
  property_size?: number;

  @IsOptional()
  smoking_allowed?: boolean;

  @IsOptional()
  pets_allowed?: boolean;

  @IsOptional()
  couples_allowed?: boolean;

  @IsOptional()
  @IsNumber()
  occupantCount?: number;
}
