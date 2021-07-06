import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class ExerciseVideo extends Model {

    static associate (models) {
      this.belongsTo(models.Exercise);
      this.belongsTo(models.Video);
    }
  }

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
    modelName: 'exerciseVideo'
  });
  return ExerciseVideo;
};