'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('QuizVideos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      quizId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Quizzes',
          key: 'id'
        }
      },
      videoId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Videos',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('QuizVideos');
  }
};