import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Course extends Model {
    static associate (models) {
      this.belongsTo(models.CourseDefinition);
      this.hasMany(models.CourseUser);
      this.belongsToMany(models.User, { through: models.CourseUser });
    }

    static loadScopes (db) {
      this.addScope('defaultScope', {
        include: db.Course.defaultIncludes(db)
      }, {
        override: true
      });
    }

    static defaultIncludes (db) {
      return [{
        model: db.CourseUser,
        separate: true,
        include: db.CourseUser.defaultIncludes(db)
      }];
    }
  }

  Course.init({
    instructorId: DataTypes.INTEGER,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    avatarUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'course'
  });
  return Course;
};