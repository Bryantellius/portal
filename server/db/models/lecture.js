import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Lecture extends Model {
    static quiz;
    static module;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.quiz = this.hasOne(models.Quiz, { foreignKey: 'lectureId' });
      this.module = this.belongsTo(models.Module, { foreignKey: 'moduleId' });
    }
  };
  Lecture.init({
    moduleId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    fileName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Lecture',
  });
  return Lecture;
};