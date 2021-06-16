'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Video extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Exercise, { through: models.ExerciseVideo });
      this.belongsToMany(models.Lecture, { through: models.LectureVideo });
      this.belongsToMany(models.Quiz, { through: models.QuizVideo });
    }
  };
  Video.init({
    title: DataTypes.STRING,
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'video',
  });
  return Video;
};