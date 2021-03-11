'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ArticleClassify extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ArticleClassify.init({
    name: DataTypes.TEXT,
    parent_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ArticleClassify',
  });
  return ArticleClassify;
};