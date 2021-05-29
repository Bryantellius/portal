import { Model } from "sequelize";
export default (sequelize: any, DataTypes: any) => {
  class Lecture extends Model {
    static quiz: any;
    static module: any;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
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