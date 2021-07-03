import { Model }  from 'sequelize';
export default (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      this.hasMany(models.CourseUser);
      this.belongsToMany(models.User, { through: models.CourseUser });
      this.belongsToMany(models.Module, { through: models.CourseModule });
    }

    static loadScopes (db) {
      this.addScope('defaultScope', {
        include: [
          { model: db.User },
          {
            model: db.Module,
            include: [
              {
                model: db.Lecture,
                include: [
                  {
                    model: db.Video
                  },
                  {
                    model: db.Quiz,
                    include: [
                      {
                        model: db.QuizQuestion,
                        include: [
                          {
                            model: db.QuizQuestionOption
                          }
                        ]
                      },
                      {
                        model: db.Video
                      }
                    ]
                  },
                  {
                    model: db.Exercise,
                    include: [
                      {
                        model: db.Video
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ],
        order: [
          [db.Module, 'sortOrder', 'ASC'],
          [db.Module, 'id', 'ASC'],
          [db.Module, db.Lecture, 'id', 'ASC'],
          [db.Module, db.Lecture, db.Video, 'id', 'ASC'],
          [db.Module, db.Lecture, db.Exercise, db.Video, 'id', 'ASC'],
          [db.Module, db.Lecture, db.Quiz, db.Video, 'id', 'ASC'],
          [db.Module, db.Lecture,  db.Quiz,  db.QuizQuestion, 'sortOrder', 'ASC'],
          [db.Module, db.Lecture,  db.Quiz,  db.QuizQuestion, db.QuizQuestionOption, 'sortOrder', 'ASC']
        ]
      }, {
        override: true
      });
    }
  }
  Course.init({
    instructorId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    type: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    currentlyActive: DataTypes.BOOLEAN,
    avatarUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'course',
  });
  return Course;
};