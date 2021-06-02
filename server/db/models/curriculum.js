import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Curriculum extends Model {
    static modules;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.modules = this.hasMany(models.Module, { foreignKey: 'curriculumId' });
    }
  };
  Curriculum.init({
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Curriculum',
  });
  return Curriculum;
};