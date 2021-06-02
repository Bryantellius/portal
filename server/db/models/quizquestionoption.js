import { Model } from "sequelize";
 
export default (sequelize, DataTypes) => {
  class QuizQuestionOption extends Model {
    static question;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  };

  QuizQuestionOption.init({
    quizQuestionId: DataTypes.INTEGER,
    value: DataTypes.STRING,
    text: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'QuizQuestionOption',
  });
  return QuizQuestionOption;
};