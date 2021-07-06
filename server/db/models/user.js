import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class User extends Model {

    static associate (models) {
      this.hasMany(models.CourseUser);
      this.belongsTo(models.Role);
      this.belongsToMany(models.Course, { through: models.CourseUser });
      this.hasMany(models.QuizSubmission);
      this.hasMany(models.ExerciseSubmission);
      this.hasMany(models.ExerciseComment);
    }

    static defaultIncludes (db) {
      return [
        {
          model: db.QuizSubmission,
          separate: true,
          include: db.QuizSubmission.defaultIncludes(db)
        },
        {
          model: db.ExerciseSubmission,
          separate: true,
          include: db.ExerciseSubmission.defaultIncludes(db)
        }
      ]
    }
  }

  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    auth0Id: DataTypes.STRING,
    discordUsername: DataTypes.STRING,
    avatarUrl: DataTypes.STRING,
    lastLectureId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user',
  });

  return User;
};