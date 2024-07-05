import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    console.log(createPostDto);
    if (
      createPostDto.category === 'Choose a community' ||
      createPostDto.body === '' ||
      createPostDto.title === ''
    ) {
      throw new BadRequestException();
    }
    return this.postService.create(createPostDto);
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Get('/user/:userId')
  findPostWithUserId(@Param('userId') userId: string) {
    return this.postService.findPostWithUserId(+userId);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    if (
      updatePostDto.category === 'Choose a community' ||
      updatePostDto.body === '' ||
      updatePostDto.title === ''
    ) {
      throw new BadRequestException();
    }
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
