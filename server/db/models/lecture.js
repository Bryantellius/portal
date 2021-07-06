import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Lecture extends Model {

    static associate (models) {
      this.hasOne(models.Quiz);
      this.hasOne(models.Exercise);
      this.belongsTo(models.Module);
      this.belongsToMany(models.Video, { through: models.LectureVideo });
      this.hasMany(models.LectureRating);
    }

    static defaultIncludes (db) {
      return [
        {
          model: db.Video
        },
        {
          model: db.Exercise,
          include: db.Exercise.defaultIncludes(db)
        },
        {
          model: db.Quiz,
          include: db.Quiz.defaultIncludes(db)
        },
        {
          model: db.LectureRating,
          separate: true
        }
      ];
    }
  }

  Lecture.init({
    moduleId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'modules',
        key: 'id'
      }
    },
    title: DataTypes.STRING,
    content: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'lecture'
  });
  return Lecture;
};