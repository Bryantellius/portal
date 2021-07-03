import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class User extends Model {
    static role;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.CourseUser);
      this.belongsTo(models.Role);
      this.belongsToMany(models.Course, { through: models.CourseUser });
      this.hasMany(models.QuizSubmission);
      this.hasMany(models.ExerciseSubmission);
    }
  };
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    auth0Id: DataTypes.STRING,
    roleId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'roles',
        key: 'id'
      }
    },
    discordUsername: DataTypes.STRING,
    avatarUrl: DataTypes.STRING,
    lastLectureId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user',
  });
  return User;
};