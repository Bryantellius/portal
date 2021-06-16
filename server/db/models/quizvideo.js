'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QuizVideo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Quiz);
      this.belongsTo(models.Video);
    }
  };
  QuizVideo.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    quizId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'quizzes',
        key: 'id'
      }
    },
    videoId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'videos',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'quizVideo',
  });
  return QuizVideo;
};