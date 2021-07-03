import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Module extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Course, { through: models.CourseModule });
      this.hasMany(models.Lecture);
    }
  };
  Module.init({
    title: DataTypes.STRING,
    sortOrder: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'module',
  });
  return Module;
};