'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CourseModule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // this.belongsToMany(models.Course, { through: CourseModule });
      // this.belongsToMany(models.Module, { through: CourseModule });
    }
  };
  CourseModule.init({
    courseId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'courses',
        key: 'id'
      }
    },
    moduleId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'modules',
        key: 'id'
      }
    },
    sortOrder: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'courseModule',
  });
  return CourseModule;
};