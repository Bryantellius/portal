import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Course extends Model {
    static curriculum;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.curriculum = this.hasOne(models.Curriculum, { foreignKey: 'curriculumId' });
    }
  };
  Course.init({
    instructorId: DataTypes.INTEGER,
    curriculumId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    type: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    currentlyActive: DataTypes.BOOLEAN,
    avatarUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};