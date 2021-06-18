'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class exerciseSubmission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Exercise);
      this.belongsTo(models.User);
    }
  };
  exerciseSubmission.init({
    hasBeenReviewed: DataTypes.BOOLEAN,
    exerciseId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'exercises',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    repoUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'exerciseSubmission',
  });
  return exerciseSubmission;
};