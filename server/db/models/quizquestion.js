import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class QuizQuestion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.QuizQuestionOption);
      this.belongsTo(models.Quiz);
    }
  };

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
    modelName: 'quizQuestion',
  });
  return QuizQuestion;
};