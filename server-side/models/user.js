'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  User.associate = function(models) {
   User.hasMany(models.Hike,{
     as: 'hikes',
     foreignKey: 'userId'
   })
  };
  return User;
};