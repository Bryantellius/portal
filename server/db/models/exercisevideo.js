'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ExerciseVideo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Exercise);
      this.belongsTo(models.Video);
    }
  };
  ExerciseVideo.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    exerciseId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'exercises',
        key: 'id'
      }
    },
    videoId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'videos',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'exerciseVideo',
  });
  return ExerciseVideo;
};