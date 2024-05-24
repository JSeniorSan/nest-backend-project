import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { User } from 'src/users/user.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { PostModel } from './posts.model';
import { UploadsModule } from 'src/uploads/uploads.module';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [
    SequelizeModule.forFeature([User, PostModel]),
    JwtModule,
    UploadsModule,
  ],
  exports: [PostsService],
})
export class PostsModule {}
