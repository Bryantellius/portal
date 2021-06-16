'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exercise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Lecture);
      this.belongsToMany(models.Video,{ through: models.ExerciseVideo });
    }
  };
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
    modelName: 'exercise',
  });
  return Exercise;
};