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
    const role = await this.roleService.getRoleByValue('ADMIN');
    console.log('role in user service', role);
    await userInfo.$set('roles', [role.id]);
    return userInfo;
  }

  async allUsers() {
    return await this.userRepository.findAll({
      include: { association: 'roles' },
    });
  }
}
