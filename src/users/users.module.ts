import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { Role } from 'src/roles/roles.model';
import { UserRole } from 'src/roles/users-roles.model';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';
import { PostModel } from 'src/posts/posts.model';
import { PostsModule } from 'src/posts/posts.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRole, PostModel]),
    RolesModule,
    forwardRef(() => AuthModule),
    PostsModule,
  ],
  exports: [UsersService],
})
export class UsersModule {}
