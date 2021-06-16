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
      this.hasMany(models.QuizQuestion);
      this.belongsTo(models.Lecture);
      this.belongsToMany(models.Video, { through: models.QuizVideo });
    }
  };
  Quiz.init({
    lectureId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'lectures',
        key: 'id'
      }
    },
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'quiz',
  });
  return Quiz;
};