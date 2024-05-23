import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post';
import { PostsService } from './posts.service';
import { PostModel } from './posts.model';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @ApiOperation({ summary: 'Создание поста' })
  @ApiResponse({ status: 201, type: PostModel })
  @Post()
  createPost(@Body() dto: CreatePostDto) {
    return this.postsService.create(dto);
  }

  @ApiResponse({ status: 200, type: [PostModel] })
  @ApiOperation({ summary: 'Получение всех постов' })
  @Get()
  getAllPosts() {
    return this.postsService.getAll();
  }

  @ApiOperation({ summary: 'Получение поста по id' })
  @ApiResponse({ status: 200, type: PostModel })
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.postsService.getById(id);
  }
}
