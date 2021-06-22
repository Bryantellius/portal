import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class CourseUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // this.belongsToMany(models.Course, { through: CourseUser});
      // this.belongsToMany(models.User, { through: CourseUser });
    }
  };
  CourseUser.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    courseId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'courses',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
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