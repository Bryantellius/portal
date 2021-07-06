import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class QuizVideo extends Model {
    static associate (models) {
      this.belongsTo(models.Quiz);
      this.belongsTo(models.Video);
    }
  }

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
    modelName: 'quizVideo'
  });
  return QuizVideo;
};