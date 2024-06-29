import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';

import { Request } from 'express';

import { ActiveUser } from '../common/decorators/active-user.decorator';
import { UserActiveInterface } from '../common/interfaces/user-active.interface';
import { Role } from '../common/enums/rol.enum';
import { AuthService } from './auth.service';
import { Auth } from './decorators/auth.decorator';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { LoginResponse } from './interfaces/login-response';
import { User } from '../users/entities/user.entity';
import { AuthGuard } from './guard/auth.guard';
import { ApiTags } from '@nestjs/swagger';

interface RequestWithUser extends Request {
  user: {
    email: string;
    role: string;
  };
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(
    @Body()
    registerDto: RegisterDto,
  ) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(
    @Body()
    loginDto: LoginDto,
  ) {
    return this.authService.login(loginDto);
  }

  @Get('profile')
  @Auth(Role.USER)
  profile(@ActiveUser() user: UserActiveInterface) {
    //console.log(user);
    return this.authService.profile(user);
  }

  @UseGuards(AuthGuard)
  @Get('check-token')
  async checkToken(@Req() req: Request): Promise<LoginResponse> {
    const user = req['user'] as User;

    //console.log(user);

    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    return {
      user,
      token: await this.authService.getJwtToken(payload),
    };
  }
}
