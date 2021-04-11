import {
  DataType, Model, Table, Column, PrimaryKey,
  AutoIncrement, HasMany,
} from 'sequelize-typescript';
import Comment from './Comment';

interface TopicAttributes{
  name: string,
  content:string,
  userId: number,
}

@Table({
  timestamps: false,
  paranoid: true,
  tableName: 'topics',
})

class Topic extends Model<TopicAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  topicId: number;

  @Column(DataType.TEXT)
  name:string;

  @Column(DataType.TEXT)
  content:string;

  @Column(DataType.INTEGER)
  userId: number;

  @HasMany(() => { return Comment; }, 'topicId')
  comments: Comment[]
}
export default Topic;
