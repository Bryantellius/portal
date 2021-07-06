import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class ExerciseSubmission extends Model {
    static associate (models) {
      this.belongsTo(models.Exercise);
      this.belongsTo(models.User);
    }

    static defaultIncludes (db) {
      return [
        db.User,
        {
          model: db.Exercise,
          include: [
            {
              model: db.ExerciseComment,
              include: [
                db.User
              ]
            }
          ]
        }
      ];
    }
  }


  ExerciseSubmission.init({
    hasBeenReviewed: DataTypes.BOOLEAN,
    repoUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'exerciseSubmission'
  });
  return ExerciseSubmission;
};