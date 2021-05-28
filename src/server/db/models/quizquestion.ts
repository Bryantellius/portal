import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class QuizQuestion extends Model {
    static quiz: any;
    static options: any;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      this.options = this.hasMany(models.QuizQuestionOption, { foreignKey: 'quizQuestionId', as: 'options' });
    }
  };

  QuizQuestion.init({
    quizId: DataTypes.INTEGER,
    text: DataTypes.STRING,
    type: DataTypes.INTEGER,
    sortOrder: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'QuizQuestion',
  });
  return QuizQuestion;
};