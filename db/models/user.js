'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    uid: DataTypes.STRING,
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    realname: DataTypes.STRING,
    address: DataTypes.STRING,
    status: DataTypes.INTEGER,
    role: DataTypes.INTEGER,
    mobile: DataTypes.STRING,
    notes: DataTypes.STRING,
    avatar: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};