import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { UserDto } from './dto/user-roles';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @ApiOperation({ summary: 'Создание роли' })
  @ApiResponse({ status: 201 })
  @Post()
  create(@Body() roleDto: UserDto) {
    return this.rolesService.createRole(roleDto);
  }

  @ApiOperation({ summary: 'Получение конкретной роли по value' })
  @ApiResponse({ status: 200 })
  @Get('/:value')
  getRoles(@Param('value') value: string) {
    return this.rolesService.getRoleByValue(value);
  }
}
