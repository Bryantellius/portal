'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LectureVideo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Lecture);
      this.belongsTo(models.Video);
    }
  };
  LectureVideo.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    lectureId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'lectures',
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
    modelName: 'lectureVideo',
  });
  return LectureVideo;
};