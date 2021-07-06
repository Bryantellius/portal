import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Exercise extends Model {
    static associate (models) {
      this.belongsTo(models.Lecture);
      this.belongsToMany(models.Video, { through: models.ExerciseVideo });
      this.hasMany(models.ExerciseSubmission);
      this.hasMany(models.ExerciseComment);
    }

    static defaultIncludes (db) {
      return [
        db.Video,
        {
          model: db.ExerciseSubmission,
          separate: true,
          order: [[
            'id', 'ASC'
          ]],
          include: db.ExerciseSubmission.defaultIncludes(db)
        },
        {
          model: db.ExerciseComment,
          separate: true,
          order: [[
            'id', 'ASC'
          ]],
          include: db.ExerciseComment.defaultIncludes(db)
        }
      ];
    }
  }

  Exercise.init({
    lectureId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'lectures',
        key: 'id'
      }
    },
    content: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'exercise'
  });
  return Exercise;
};