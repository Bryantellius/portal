import {
  Model
} from 'sequelize';

export default (sequelize, DataTypes) => {
  class CourseModule extends Model {
    static associate(models) {
      this.belongsTo(models.CourseDefinition);
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