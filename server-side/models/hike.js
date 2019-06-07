'use strict';
module.exports = (sequelize, DataTypes) => {
  const Hike = sequelize.define('Hike', {
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    userId: DataTypes.INTEGER, 
    timestamp: DataTypes.FLOAT
  }, {});
  Hike.associate = function(models) {
   
  };
  return Hike;
};