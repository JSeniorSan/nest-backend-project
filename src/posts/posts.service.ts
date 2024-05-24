import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PostModel } from './posts.model';
import { CreatePostDto } from './dto/create-post';
import { UploadsService } from 'src/uploads/uploads.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(PostModel) private postRepository: typeof PostModel,
    private uploadService: UploadsService,
  ) {}

  async create(dto: CreatePostDto, image: unknown) {
    const imagePath = await this.uploadService.transformToFilePath(image);
    const post = this.postRepository.create({ ...dto, image: imagePath });
    return post;
  }

  async getAll() {
    return await this.postRepository.findAll({ include: { all: true } });
  }

  async getById(pk: string) {
    return await this.postRepository.findByPk(pk, { include: { all: true } });
  }
}
