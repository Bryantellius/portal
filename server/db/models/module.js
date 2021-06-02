import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Module extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  };
  Module.init({
    curriculumId: DataTypes.INTEGER,
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Module',
  });
  return Module;
};