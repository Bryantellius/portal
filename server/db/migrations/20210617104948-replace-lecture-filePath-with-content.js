'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('lectures', 'fileName');
    await queryInterface.addColumn('lectures', 'content', Sequelize.TEXT);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('lectures', 'fileName', Sequelize.STRING);
    await queryInterface.removeColumn('lectures', 'content');
  }
};
