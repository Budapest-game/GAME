import {
  DataType, Model, Table, Column, PrimaryKey,
  AutoIncrement, ForeignKey,
} from 'sequelize-typescript';
import Comment from './Comment';

interface ReactiontAttributes{
  reactionType: string,
  reactionTo: number,
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
  reactionId: number;

  @Column(DataType.CHAR)
  reactionType: string;

  @ForeignKey(() => { return Comment; })
  @Column(DataType.INTEGER)
  reactionTo: number;

  @Column(DataType.INTEGER)
  userId: number;
}
export default Reaction;
