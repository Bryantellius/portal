import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.User, { through: models.CourseUser});
      this.belongsToMany(models.Module, { through: 'courseModules' });
    }
  };

  Course.init({
    instructorId: DataTypes.INTEGER,
    title: DataTypes.STRING,
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