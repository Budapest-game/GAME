import {
  Model, Table, BelongsTo,
  Column, ForeignKey, DataType,
} from 'sequelize-typescript';
import Reaction from './Reaction';
import Comment from './Comment';

interface CommentReactiontAttributes{
  commentId: number,
  reactionId: number,
  userId: number,
}

@Table({
  timestamps: false,
  tableName: 'comments_reactions',
})

class CommentsReactions extends Model<CommentReactiontAttributes> {
  @ForeignKey(() => { return Comment; })
  @Column
  commentId: number

  @BelongsTo(() => { return Comment; }) comment: Comment

  @ForeignKey(() => { return Reaction; })
  @Column
  reactionId: number

  @BelongsTo(() => { return Reaction; }) reaction: Reaction;

  @Column(DataType.INTEGER)
  userId: number;
}
export default CommentsReactions;
