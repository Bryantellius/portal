import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Module extends Model {
    static associate (models) {
      this.belongsTo(models.CourseDefinition);
      this.hasMany(models.Lecture);
    }

    static defaultIncludes (db) {
      return [
        {
          model: db.Lecture,
          separate: true,
          order: [['id', 'ASC']],
          include: db.Lecture.defaultIncludes(db)
        }
      ];
    }
  }

  Module.init({
    title: DataTypes.STRING,
    sortOrder: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'module'
  });
  return Module;
};