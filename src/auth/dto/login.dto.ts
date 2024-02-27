import { Transform } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  usernameOrEmail: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  password: string;
}
