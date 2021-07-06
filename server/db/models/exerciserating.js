import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class ExerciseRating extends Model {
    static associate (models) {
      this.belongsTo(models.Exercise);
      this.belongsTo(models.User);
    }
  }

  ExerciseRating.init({
    rating: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'exerciseRating'
  });
  return ExerciseRating;
};