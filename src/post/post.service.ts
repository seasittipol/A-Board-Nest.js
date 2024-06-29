import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  create(createPostDto: CreatePostDto) {
    return this.prisma.post.create({ data: createPostDto });
  }

  findAll() {
    return this.prisma.post.findMany({
      include: {
        user: { select: { firstName: true, lastName: true, image: true } },
        _count: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.post.findUnique({
      where: { id },
      include: {
        user: { select: { firstName: true, lastName: true, image: true } },
        _count: true,
        Comment: {
          select: {
            description: true,
            updatedAt: true,
            user: { select: { firstName: true, lastName: true, image: true } },
          },
        },
      },
    });
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return this.prisma.post.update({ data: updatePostDto, where: { id } });
  }

  remove(id: number) {
    return this.prisma.post.delete({ where: { id } });
  }
}
