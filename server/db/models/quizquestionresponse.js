import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class QuizQuestionResponse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.QuizQuestion);
      this.belongsTo(models.User);
      this.belongsTo(models.QuizSubmission);
    }
  };
  QuizQuestionResponse.init({
    quizQuestionId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'quizQuestions',
        key: 'id'
      }
    },
    value: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'quizQuestionResponse',
  });
  return QuizQuestionResponse;
};