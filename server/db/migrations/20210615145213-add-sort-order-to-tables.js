'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('quizQuestionOptions', 'sortOrder', Sequelize.INTEGER);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('quizQuestionOptions', 'sortOrder');
  }
};
