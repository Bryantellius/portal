'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'auth0Id', Sequelize.STRING);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'auth0Id');
  }
};
