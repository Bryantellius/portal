import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Video extends Model {
    static associate (models) {
      // this.belongsToMany(models.Exercise, { through: models.ExerciseVideo });
      // this.belongsToMany(models.Lecture, { through: models.LectureVideo });
      // this.belongsToMany(models.Quiz, { through: models.QuizVideo });
    }
  }

  Video.init({
    title: DataTypes.STRING,
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'video'
  });
  return Video;
};