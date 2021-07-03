import {
  Model
} from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class CourseModule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Course);
      this.belongsTo(models.Module);
    }
  };
  CourseModule.init({
    sortOrder: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'courseModule',
  });
  return CourseModule;
};