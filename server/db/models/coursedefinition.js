import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class CourseDefinition extends Model {
    static associate (models) {
      this.hasMany(models.Course);
      this.hasMany(models.Module);
    }

    static loadScopes (db) {
      this.addScope('defaultScope', {
        include: this.defaultIncludes(db),
        order: [
          // [db.Module, 'sortOrder', 'ASC'],
          // [db.Module, db.Lecture, 'id', 'ASC'],
          // [db.Module, db.Lecture, db.Video, 'id', 'ASC'],
          // [db.Module, db.Lecture, db.Exercise, db.Video, 'id', 'ASC'],
          // [db.Module, db.Lecture, db.Quiz, db.Video, 'id', 'ASC'],
          // [db.Module, db.Lecture, db.Quiz, db.QuizQuestion, 'sortOrder', 'ASC'],
          // [db.Module, db.Lecture, db.Quiz, db.QuizQuestion, db.QuizQuestionOption, 'sortOrder', 'ASC']
        ]
      }, {
        override: true
      });
    }

    static defaultIncludes (db) {
      return [
        {
          model: db.Course,
          separate: true
        },
        {
          model: db.Module,
          separate: true,
          include: db.Module.defaultIncludes(db),
          order: [[
            'sortOrder', 'ASC'
          ]]
        }
      ];
    }
  }

  CourseDefinition.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'courseDefinition'
  });
  return CourseDefinition;
};