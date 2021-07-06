import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Role extends Model {
    static associate (models) {
      this.hasMany(models.User);
    }
  }

  Role.init({
    title: DataTypes.STRING,
    access: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'role'
  });
  return Role;
};