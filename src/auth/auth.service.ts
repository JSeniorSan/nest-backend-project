import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user-dto';
import { User } from 'src/users/user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    const token = this.generateToken(user);
    return token;
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.usersService.getUserByEmail(userDto.email);

    if (candidate) {
      throw new HttpException(
        'Такой пользователь уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(userDto.password, 5);

    const user = await this.usersService.createUser({
      ...userDto,
      password: hashPassword,
    });
    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(user: CreateUserDto) {
    const logUserInfo = await this.usersService.getUserByEmail(user.email);

    if (!logUserInfo) {
      throw new HttpException(
        'Неверный логин или пароль',
        HttpStatus.NOT_FOUND,
      );
    }
    const resultIsTrue = await bcrypt.compare(
      user.password,
      logUserInfo.password,
    );
    if (resultIsTrue) {
      return logUserInfo;
    }

    throw new UnauthorizedException({
      message: 'Некорректная почта или пароль',
    });
  }
}
