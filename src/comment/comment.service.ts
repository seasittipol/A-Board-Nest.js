import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  create(createCommentDto: CreateCommentDto) {
    return this.prisma.comment.create({ data: createCommentDto });
  }

  findAll() {
    return this.prisma.comment.findMany({
      include: {
        user: { select: { firstName: true, lastName: true, image: true } },
      },
    });
  }

  findOne(id: number) {
    return this.prisma.comment.findUnique({
      where: { id },
      include: {
        user: { select: { firstName: true, lastName: true, image: true } },
      },
    });
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return this.prisma.comment.update({
      where: { id },
      data: updateCommentDto,
    });
  }

  remove(id: number) {
    return this.prisma.comment.delete({ where: { id } });
  }
}
