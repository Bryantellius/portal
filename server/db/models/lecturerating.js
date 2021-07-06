import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class lectureRating extends Model {
    static associate (models) {
      this.belongsTo(models.Lecture);
      this.belongsTo(models.User);
    }
  }

  lectureRating.init({
    rating: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'lectureRating',
  });
  return lectureRating;
};