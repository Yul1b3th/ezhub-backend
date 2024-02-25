import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';

import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { password, ...userData } = registerDto;

    await this.usersService.create({
      password: await bcryptjs.hash(password, 10),
      ...userData,
    });

    return { password, ...userData };
  }

  async login({ usernameOrEmail, password }: LoginDto) {
    const user = await this.usersService.findByUsernameOrEmailWithPassword(
      usernameOrEmail,
    );
    if (!user) {
      throw new UnauthorizedException('Username or email is wrong');
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Password is wrong');
    }

    const payload = {
      username: user.username,
      email: user.email,
      role: user.role,
    };
    const token = await this.jwtService.signAsync(payload);

    return {
      token,
      user,
      // email: user.email,
    };
  }

  async profile({ email, role }: { email: string; role: string }) {
    return await this.usersService.findOneByEmail(email);
  }
}
