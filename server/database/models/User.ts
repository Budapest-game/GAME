import { DataType, Model, Table, Column, PrimaryKey } from 'sequelize-typescript';

//Тест модель 
interface UserAttributes{
  id: number
}

@Table({
  timestamps: false, // don't add 'created_at', 'updated_at'
  paranoid: true, // add 'deleted_at'
  tableName: 'users',
})

class User extends Model<UserAttributes> {
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;
}
export default User;
