import {
  DataType, Model, Table, Column, AllowNull, BelongsTo,
} from 'sequelize-typescript';
import Theme from './Theme';

interface UserThemeAttributes {
  userId: number,
  themeId: string,
}

@Table({
  timestamps: false,
  tableName: 'userTheme',
})
class UserTheme extends Model<UserThemeAttributes> {
  @Column(DataType.INTEGER)
  userId: number;

  @AllowNull(false)
  @Column(DataType.TEXT)
  themeId: string;

  @BelongsTo(() => { return Theme; }, 'themeId')
  theme: Theme;
}
export default UserTheme;
