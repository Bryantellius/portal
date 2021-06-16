'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('ClassList', 'CourseUsers');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('CourseUsers', 'ClassList');
  }
};
