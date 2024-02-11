import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

import { Transform } from 'class-transformer';

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

  @IsOptional()
  @IsNotEmpty()
  @Length(1, 50)
  bed_type?: string;

  @Length(0, 500)
  amenities?: string;

  @IsNotEmpty({ message: 'Available from date is required' })
  @IsDate({ message: 'Invalid date' })
  available_from: Date;

  @IsBoolean()
  utilities_included: boolean;

  @IsBoolean()
  deposit_required: boolean;

  @Length(0, 500)
  services_included: string;

  @Length(0, 5000)
  photos: string;
}
