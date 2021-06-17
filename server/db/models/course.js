import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.User, { through: models.CourseUser, as: 'users' });
      this.belongsToMany(models.Module, { through: models.CourseModule, as: 'modules' });
    }
  };

  Course.init({
    instructorId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    type: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    currentlyActive: DataTypes.BOOLEAN,
    avatarUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'course',
  });
  return Course;
};