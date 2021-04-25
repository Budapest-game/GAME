import {
  DataType, Model, Table, Column, PrimaryKey, AllowNull, HasMany,
} from 'sequelize-typescript';
import UserTheme from './UserTheme';

interface ThemeAttributes {
  id: string,
  theme: string,
}

@Table({
  timestamps: false,
  tableName: 'themes',
})
class Theme extends Model<ThemeAttributes> {
  @PrimaryKey
  @Column(DataType.TEXT)
  id: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  theme: string;

  @HasMany(() => { return UserTheme; }, 'themeId')
  themeUsers: UserTheme[]
}
export default Theme;
