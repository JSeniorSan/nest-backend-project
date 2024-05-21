import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class assignRoleDto {
  @ApiProperty({ example: '1', description: 'ID пользователя' })
  @IsNumber()
  readonly userId: number;

  @ApiProperty({ example: 'USER', description: 'Текущая роль у пользователя' })
  @IsString()
  readonly value: string;
}
