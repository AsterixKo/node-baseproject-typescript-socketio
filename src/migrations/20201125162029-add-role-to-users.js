'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'users', // table name where will create the new field
      'roleId',   
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'roles', // a que tabla conecta
          key: 'id'       // con que campo de esa tabla conecta
        },
        onUpdate: 'SET NULL',
        onDelete: 'SET NULL'
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'users',
      'roleId'
    )
  }
};
