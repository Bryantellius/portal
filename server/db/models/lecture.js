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
      this.hasOne(models.Quiz);
      this.hasOne(models.Exercise);
      this.belongsTo(models.Module);
      this.belongsToMany(models.Video, { through: models.LectureVideo })
    }
  };
  Lecture.init({
    moduleId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'modules',
        key: 'id'
      }
    },
    title: DataTypes.STRING,
    fileName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'lecture',
  });
  return Lecture;
};