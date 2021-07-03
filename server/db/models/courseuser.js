import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class CourseUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      this.belongsTo(models.Course);
      this.belongsTo(models.User);
    }
  };
  CourseUser.init({
    courseId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'course',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    dateCompleted: {
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'courseUser',
  });
  return CourseUser;
};