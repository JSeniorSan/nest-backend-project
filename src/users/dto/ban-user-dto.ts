import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class banUserDto {
  @ApiProperty({ example: '1' })
  @IsNumber()
  readonly userId: number;

  @IsString()
  @ApiProperty({ example: '1' })
  readonly banReason: string;
}
