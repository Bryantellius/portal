import { Model } from "sequelize";
export default (sequelize: any, DataTypes: any) => {
  class Lecture extends Model {
    filePath(arg0: string, arg1: string, filePath: any) {
        throw new Error("Method not implemented.");
    }
    static quiz: any;
    static module: any;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      this.quiz = this.hasOne(models.Quiz, { foreignKey: 'lectureId' });
    }
  };
  Lecture.init({
    moduleId: DataTypes.INTEGER,
    lectureGroupId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    fileName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Lecture',
  });
  return Lecture;
};