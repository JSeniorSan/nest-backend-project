import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './roles.model';
import { UserDto } from './dto/user-roles';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  async createRole(dto: UserDto) {
    return await this.roleRepository.create(dto);
  }

  async getRoleByValue(value: string) {
    console.log('role service', value);
    return await this.roleRepository.findOne({ where: { value } });
  }
}
