import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class QuizQuestionResponse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  };
  QuizQuestionResponse.init({
    quizQuestionId: DataTypes.INTEGER,
    value: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'QuizQuestionResponse',
  });
  return QuizQuestionResponse;
};