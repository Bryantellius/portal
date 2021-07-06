import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class CourseUser extends Model {

    static associate (models) {
      this.belongsTo(models.Course);
      this.belongsTo(models.User);
    }

    static defaultIncludes (db) {
      return [{
        model: db.User,
        include: db.User.defaultIncludes(db)
      }];
    }
  }

  CourseUser.init({
    courseId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'course',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    dateCompleted: {
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'courseUser'
  });
  return CourseUser;
};