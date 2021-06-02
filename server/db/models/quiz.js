import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Quiz extends Model {
    static questions;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.questions = this.hasMany(models.QuizQuestion, { foreignKey: 'quizId', as: 'questions' });
    }
  };
  Quiz.init({
    lectureId: DataTypes.INTEGER,
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Quiz',
  });
  return Quiz;
};