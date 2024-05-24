import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ example: 'title' })
  readonly title: string;

  @ApiProperty({ example: 'text' })
  readonly text: string;

  @ApiProperty({ example: 1 })
  readonly userId: number;
}
