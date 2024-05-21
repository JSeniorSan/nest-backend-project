import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { User } from './user.model';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';
import { assignRoleDto } from './dto/assign-role-dto';
import { banUserDto } from './dto/ban-user-dto';

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

  async assignRoleForUser(dto: assignRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);

    if (user && role) {
      await user.$add('roles', role);
      return dto;
    }

    if (!user && !role) {
      return new HttpException(
        'Нет такого пользователя или роли',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async ban(dto: banUserDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    if (!user) {
      throw new HttpException('Такого полььзователя нет', HttpStatus.NOT_FOUND);
    }
    user.banned = true;
    user.banResponse = dto.banReason;
    user.save();
  }
}
