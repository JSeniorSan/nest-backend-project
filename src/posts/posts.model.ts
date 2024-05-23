import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/users/user.model';

interface PostInterface {
  title: string;
  imageUrl: string;
  text: string;
  userId: number;
}

@Table({ tableName: 'Posts' })
export class PostModel extends Model<PostModel, PostInterface> {
  @ApiProperty({ example: '1' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({ example: 'New post' })
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @ApiProperty({
    example:
      'Создание нововй статьи происходит очень легко, это доказано многими разарботчиками',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  text: string;

  @ApiProperty({ example: 'http://imageUrl.com' })
  @Column({ type: DataType.STRING, allowNull: true })
  imageUrl: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  author: User;
}
