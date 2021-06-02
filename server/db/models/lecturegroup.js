import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class LectureGroup extends Model {
    static lectures;
    static module;
    static quiz;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.lectures = this.hasMany(models.Lecture, { foreignKey: 'lectureId' });
      this.module = this.belongsTo(models.Module, { foreignKey: 'id' });
      this.quiz = this.hasOne(models.Quiz, { foreignKey: 'lectureGroupId' });
    }
  };
  LectureGroup.init({
    moduleId: DataTypes.INTEGER,
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'LectureGroup',
  });
  return LectureGroup;
};