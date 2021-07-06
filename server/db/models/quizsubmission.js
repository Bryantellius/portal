import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class quizSubmission extends Model {
    static associate (models) {
      this.belongsTo(models.User);
      this.belongsTo(models.Quiz);
      this.hasMany(models.QuizQuestionResponse);
    }

    static defaultIncludes (db) {
      return [
        {
          model: db.QuizQuestionResponse,
          separate: true,
          include: [
            db.User
          ]
        },
        {
          model: db.Quiz,
          include: [
            db.Lecture
          ]
        }
      ];
    }
  }

  quizSubmission.init({
    quizId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'quizzes',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    score: DataTypes.DECIMAL(5, 2)
  }, {
    sequelize,
    modelName: 'quizSubmission'
  });
  return quizSubmission;
};