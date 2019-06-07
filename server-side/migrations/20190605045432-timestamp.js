'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.addColumn(
      'Hikes',
      'timestamp',
      {
        type: Sequelize.INTEGER, 
        allowNull: false,
        refrences:{
          model: 'Users', 
          key: 'id'
        }
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Hikes',
      'timestamp'
    )
  }
};
