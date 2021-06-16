import { Model } from "sequelize";
 
export default (sequelize, DataTypes) => {
  class QuizQuestionOption extends Model {
    static question;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.QuizQuestion);
    }
  };

  QuizQuestionOption.init({
    quizQuestionId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'quizQuestions',
        key: 'id'
      }
    },
    value: DataTypes.STRING,
    text: DataTypes.STRING,
    sortOrder: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'quizQuestionOption',
  });
  return QuizQuestionOption;
};