import {
  IsEmail,
  IsNotEmpty,
  Length,
  IsOptional,
  IsPhoneNumber,
  IsDate,
  IsString,
  IsNumber,
  IsNumberString,
} from 'class-validator';

import { Transform } from 'class-transformer';

import { IsPhone } from '../../common/decorators/is-phone.decorator';

export class CreateUserDto {
  @Transform(({ value }) => value.trim())
  @IsNotEmpty({ message: 'Username is required' })
  @Length(4, 50, { message: 'Username must be between 4 and 20 characters' })
  username: string;

  @Transform(({ value }) => value.trim())
  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @Transform(({ value }) => value.trim())
  @IsNotEmpty({ message: 'Password is required' })
  @Length(6, 128, { message: 'Password must be between 6 and 128 characters' })
  password: string;

  @Transform(({ value }) => value.trim())
  @IsOptional()
  @IsString({ message: 'First name must be a string' })
  @Length(4, 50, { message: 'First name must be between 4 and 20 characters' })
  first_name?: string;

  @Transform(({ value }) => value.trim())
  @IsOptional()
  @IsString({ message: 'Last name must be a string' })
  @Length(4, 50, { message: 'Last name must be between 4 and 20 characters' })
  last_name?: string;

  @IsOptional()
  @IsPhone({ message: 'Phone number must be a 9-digit number without spaces' })
  phone?: number;

  @Transform(({ value }) => value.trim())
  @IsOptional()
  @IsString({ message: 'Address must be a string' })
  @Length(4, 300, { message: 'Address must be between 4 and 300 characters' })
  address?: string;

  @IsOptional()
  @IsDate({ message: 'Invalid date' })
  date_of_birth?: Date;

  @Transform(({ value }) => value.trim())
  @IsOptional()
  photo?: string;
}
