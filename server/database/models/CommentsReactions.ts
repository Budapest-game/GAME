import {
  Model, Table, Column, DataType, PrimaryKey,
} from 'sequelize-typescript';

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
  @Column
  commentId: number

  @Column
  reactionId: number

  @PrimaryKey
  @Column(DataType.INTEGER)
  userId: number;
}
export default CommentsReactions;
