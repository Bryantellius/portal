import { Model } from "sequelize";
export default (sequelize: any, DataTypes: any) => {
  class User extends Model {
    static role: any;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      this.role = this.hasOne(models.Role, { foreignKey: 'id' });
    }
  };
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    roleId: DataTypes.INTEGER,
    avatarUrl: DataTypes.STRING,
    lastLectureId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};