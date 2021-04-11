import {
  DataType, Model, Table, Column, PrimaryKey, BelongsToMany, AutoIncrement,
} from 'sequelize-typescript';
import Comment from './Comment';
import CommentsReactions from './CommentsReactions';

interface ReactiontAttributes{
  reactionType: string,
  userId: number,
}

@Table({
  timestamps: false,
  paranoid: true,
  tableName: 'reactions',
})

class Reaction extends Model<ReactiontAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  reactionId: number

  @Column(DataType.CHAR)
  reactionType: string;

  @BelongsToMany(() => { return Comment; }, () => { return CommentsReactions; }, 'reactionId', 'commentId')
  comments: Comment[]

  @Column(DataType.INTEGER)
  userId: number;
}
export default Reaction;
