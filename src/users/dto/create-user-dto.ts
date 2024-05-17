import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'vovchik@mail.ru',
    description: 'Почта пользователя',
  })
  readonly email: string;

  @ApiProperty({ example: '12345', description: 'Пароль пользователя' })
  readonly password: string;
}
