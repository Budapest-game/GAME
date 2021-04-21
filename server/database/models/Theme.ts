import {
  DataType, Model, Table, Column, PrimaryKey, AllowNull,
} from 'sequelize-typescript';

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
}
export default Theme;
