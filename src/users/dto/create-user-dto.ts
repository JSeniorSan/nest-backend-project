import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'vovchik@mail.ru',
    description: 'Почта пользователя',
  })
  @IsEmail({}, { message: 'Должен быть корректный почтовый ящик' })
  readonly email: string;

  @ApiProperty({ example: '12345', description: 'Пароль пользователя' })
  @MinLength(5, { message: 'Пароль должен быть не меньше 5 символов' })
  @MaxLength(20, { message: 'Пароль должен быть не больше 20 символов' })
  readonly password: string;
}
