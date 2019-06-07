'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.addColumn(
      'Hikes',
      'userId',
      {
        type:Sequelize.INTEGER,
        allowNull: false, 
        references:{
          model:'Users',
          key: 'id'
        }
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Hikes',
      'userId'
    )
  }
};
