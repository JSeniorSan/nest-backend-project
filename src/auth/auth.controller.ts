import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user-dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(200)
  @Post('/login')
  login(@Body() UserDto: CreateUserDto) {
    return this.authService.login(UserDto);
  }

  @HttpCode(201)
  @Post('/registration')
  registration(@Body() UserDto: CreateUserDto) {
    return this.authService.registration(UserDto);
  }
}
