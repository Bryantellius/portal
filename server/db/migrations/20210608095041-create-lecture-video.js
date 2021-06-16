'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('LectureVideos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      lectureId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Lectures',
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
    await queryInterface.dropTable('LectureVideos');
  }
};