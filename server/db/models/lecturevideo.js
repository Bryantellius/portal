import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class LectureVideo extends Model {
    static associate (models) {
      this.belongsTo(models.Lecture);
      this.belongsTo(models.Video);
    }
  }

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
    modelName: 'lectureVideo'
  });
  return LectureVideo;
};