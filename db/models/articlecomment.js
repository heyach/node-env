'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ArticleComment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ArticleComment.init({
    article_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    up_num: DataTypes.INTEGER,
    down_num: DataTypes.INTEGER,
    user_name: DataTypes.STRING,
    user_head_pic: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ArticleComment',
  });
  return ArticleComment;
};