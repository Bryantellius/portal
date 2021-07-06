import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class ExerciseComment extends Model {
    static associate (models) {
      this.belongsTo(models.Exercise);
      this.belongsTo(models.User);
    }

    static defaultIncludes (db) {
      return [
        db.User
      ];
    }
  }

  ExerciseComment.init({
    text: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'exerciseComment'
  });
  return ExerciseComment;
};