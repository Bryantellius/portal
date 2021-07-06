import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class QuizQuestion extends Model {

    static associate (models) {
      this.hasMany(models.QuizQuestionOption);
      this.belongsTo(models.Quiz);
      this.hasMany(models.QuizQuestionResponse);
    }

    static defaultIncludes (db) {
      return [
        {
          model: db.QuizQuestionOption,
          separate: true
        }
      ];
    }
  }

  QuizQuestion.init({
    quizId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'quizzes',
        key: 'id'
      }
    },
    text: DataTypes.STRING,
    type: DataTypes.INTEGER,
    correctAnswer: DataTypes.STRING,
    sortOrder: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'quizQuestion'
  });
  return QuizQuestion;
};