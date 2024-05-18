import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ example: 'User', description: 'Роль' })
  readonly value: string;

  @ApiProperty({
    example: 'Обычный пользователь с стандартными правами доступа',
    description: 'Описание роли',
  })
  readonly description: string;
}
