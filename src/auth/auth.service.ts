import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async register(data: CreateUserDto) {
    return this.userService.create(data);
  }

  async login(username: string) {
    return this.userService.findOneWithUsername(username);
  }
}
