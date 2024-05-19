import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RoleDto } from './dto/user-roles';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @ApiOperation({ summary: 'Создание роли' })
  @ApiResponse({ status: 201 })
  @Post()
  create(@Body() roleDto: RoleDto) {
    return this.rolesService.createRole(roleDto);
  }

  @ApiOperation({ summary: 'Получение конкретной роли по value' })
  @ApiResponse({ status: 200 })
  @Get(':value')
  getRoles(@Param('value') value: string) {
    return this.rolesService.getRoleByValue(value);
  }
}
