import { Model } from "sequelize";

export default (sequelize: any, DataTypes: any) => {
  class Quiz extends Model {
    static questions: any;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
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