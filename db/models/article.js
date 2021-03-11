'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Article.init({
    aid: DataTypes.STRING,
    title: DataTypes.STRING,
    author_id: DataTypes.INTEGER,
    content: DataTypes.STRING,
    tags: DataTypes.STRING,
    main_pic: DataTypes.STRING,
    short_intro: DataTypes.STRING,
    classify: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Article',
  });
  return Article;
};