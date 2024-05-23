import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PostModel } from './posts.model';
import { CreatePostDto } from './dto/create-post';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(PostModel) private postRepository: typeof PostModel,
  ) {}

  create(dto: CreatePostDto) {
    const post = this.postRepository.create(dto);
    return post;
  }

  getAll() {
    return this.postRepository.findAll({ include: { all: true } });
  }

  getById(pk: string) {
    return this.postRepository.findByPk(pk, { include: { all: true } });
  }
}
