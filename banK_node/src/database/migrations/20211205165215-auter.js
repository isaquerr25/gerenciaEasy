'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.renameColumn('manager_values', 'user_id', 'grid_id');
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.renameColumn('manager_values', 'grid_id', 'user_id');
  }
};
