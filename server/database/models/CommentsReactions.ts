import {
  Model, Table, BelongsTo,
  Column, ForeignKey,
} from 'sequelize-typescript';
import Reaction from './Reaction';
import Comment from './Comment';

@Table({
  timestamps: false,
  tableName: 'comments_reactions',
})

class CommentsReactions extends Model {
  @ForeignKey(() => { return Comment; })
  @Column
  commentId: number

  @BelongsTo(() => { return Comment; }) comment: Comment

  @ForeignKey(() => { return Reaction; })
  @Column
  reactionId: number

  @BelongsTo(() => { return Reaction; }) reaction: Reaction;
}
export default CommentsReactions;
