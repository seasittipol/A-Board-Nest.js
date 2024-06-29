import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    return this.prisma.user.create({ data: createUserDto });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number): Promise<User> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return this.prisma.user.update({ data: updateUserDto, where: { id } });
  }

  remove(id: number): Promise<User> {
    return this.prisma.user.delete({ where: { id } });
  }

  findOneWithUsername(username: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { username } });
  }

  findOneWithEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { email } });
  }
}
