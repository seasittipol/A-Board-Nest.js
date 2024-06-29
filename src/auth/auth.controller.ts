import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { RequestWithUser } from 'src/types/type';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Get('me')
  async getMe(@Req() req: RequestWithUser) {
    return { user: req.user };
  }

  @Post('register')
  async create(@Body() body: CreateUserDto) {
    if (body.password.trim().length < 6) {
      throw new UnauthorizedException({
        message: 'password must be more than 6 character',
      });
    }
    if (!/\S+@\S+\.\S+/.test(body.email)) {
      throw new UnauthorizedException({ message: 'email not matched' });
    }
    const user = await this.userService.findOneWithUsername(body.username);
    if (user) {
      throw new UnauthorizedException({ message: 'username already use' });
    }
    const email = await this.userService.findOneWithEmail(body.email);
    if (email) {
      throw new UnauthorizedException({ message: 'email already use' });
    }
    body.password = await bcrypt.hash(body.password, 10);
    return this.authService.register(body);
  }

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const user = await this.authService.login(body.username);
    if (!user) {
      throw new UnauthorizedException({ message: 'wrong username' });
    }
    if (!(await bcrypt.compare(body.password, user.password))) {
      throw new UnauthorizedException({ message: 'wrong password' });
    }
    const { password, ...payload } = body;
    const accessToken = jwt.sign(payload, process.env.SECRETKEY, {
      expiresIn: '24h',
    });
    delete user.password;
    return { accessToken, user };
  }
}
