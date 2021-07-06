import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class QuizQuestionOption extends Model {
    static associate (models) {
      this.belongsTo(models.QuizQuestion);
    }
  }

  QuizQuestionOption.init({
    value: DataTypes.STRING,
    text: DataTypes.STRING,
    sortOrder: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'quizQuestionOption'
  });
  return QuizQuestionOption;
};