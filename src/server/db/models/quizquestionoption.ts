import { Model } from "sequelize";
 
export default (sequelize: any, DataTypes: any) => {
  class QuizQuestionOption extends Model {
    static question: any;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {}
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