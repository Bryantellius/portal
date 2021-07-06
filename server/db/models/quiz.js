import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Quiz extends Model {
    static associate (models) {
      this.hasMany(models.QuizQuestion);
      this.hasMany(models.QuizSubmission);
      this.belongsTo(models.Lecture);
      this.belongsToMany(models.Video, { through: models.QuizVideo });
    }

    static defaultIncludes (db) {
      return [
        db.Video,
        {
          model: db.QuizQuestion,
          separate: true,
          include: db.QuizQuestion.defaultIncludes(db)
        },
        {
          model: db.QuizSubmission,
          separate: true,
          include: db.QuizSubmission.defaultIncludes(db)
        }
      ];
    }

  }

  Quiz.init({
    lectureId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'lectures',
        key: 'id'
      }
    },
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'quiz'
  });
  return Quiz;
};