'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('manager_values', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'grid-values', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      name:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      price:{
        type: Sequelize.FLOAT ,
        allowNull: false,
      },
      date_inform:{
        type: Sequelize.DATE,
        allowNull: false,
      },
      create_at:{
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('manager_values')
  }
};
