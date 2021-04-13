import {
  DataType, Model, Table, Column, PrimaryKey,
  AutoIncrement, HasMany, ForeignKey,
  BelongsToMany,
} from 'sequelize-typescript';
import CommentsReactions from './CommentsReactions';
import Reaction from './Reaction';
import Topic from './Topic';

interface CommentAttributes{
  commentId?: number,
  topicId: number,
  content: string,
  userId: number,
  replyTo: number | null,
}

@Table({
  timestamps: false,
  paranoid: true,
  tableName: 'comments',
})

class Comment extends Model<CommentAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  commentId: number;

  @ForeignKey(() => { return Topic; })
  @Column(DataType.INTEGER)
  topicId: number;

  @Column(DataType.TEXT)
  content:string;

  @Column(DataType.INTEGER)
  userId: number;

  @Column(DataType.INTEGER)
  replyTo: number;

  @HasMany(() => { return Comment; }, 'replyTo')
  replies: Comment[]

  @BelongsToMany(() => { return Reaction; }, () => { return CommentsReactions; }, 'commentId', 'reactionId')
  reactions: Reaction[];
}
export default Comment;
