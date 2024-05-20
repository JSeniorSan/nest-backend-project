import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { User } from './user.model';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const userInfo = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue('USER');
    await userInfo.$set('roles', [role.id]);
    userInfo.roles = [role];
    return userInfo;
  }

  async allUsers() {
    return await this.userRepository.findAll({
      include: { association: 'roles' },
    });
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
  }
}
