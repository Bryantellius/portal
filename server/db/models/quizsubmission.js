'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class quizSubmission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User);
      this.belongsTo(models.Quiz);
    }
  };
  quizSubmission.init({
    quizId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'quizzes',
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
    score: DataTypes.DECIMAL(5, 2)
  }, {
    sequelize,
    modelName: 'quizSubmission',
  });
  return quizSubmission;
};