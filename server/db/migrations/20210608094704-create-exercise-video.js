'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ExerciseVideos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      exerciseId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Exercises',
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
    await queryInterface.dropTable('ExerciseVideos');
  }
};