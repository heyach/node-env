const express = require("express");
const models = require("../../db/models")

const articleRouter = express.Router()

// 查询列表分页
articleRouter.get("/list", async (req, res) => {
  let limit = parseInt(req.query.limit),
    author_id = req.query.author_id,
    offset = parseInt(req.query.offset),
    where = {};
  if(author_id){
    where.author_id = author_id;
  }
  try {
    let articles = await models.Article.findAndCountAll({
      where: where,
      // 过滤部分字段
      attributes: { exclude: ['content'] },
      offset: offset,
      limit: limit
    })

    res.json({
      code: 0,
      data: articles.rows,
      count: articles.count
    })
  } catch (error) {
    res.json({
      code: -1,
      msg: "error"
    })
  }
})

// 获取article详情
articleRouter.get("/:id", async (req, res, next) => {
  let { id } = req.params;
  try {
    let article = await models.Article.findOne({
      where: {
        id
      }
    })
    if(article){
      let user = await models.User.findOne({
        where: {
          uid: article.author_id
        },
        attributes: { exclude: ['password'] },
      })
      let comments = await models.ArticleComment.findAndCountAll({
        where: {
          article_id: article.id
        },
        offset: 0,
        limit: 10
      })
      res.json({
        code: 0,
        data: {
          article,
          author: user,
          comments: comments.rows
        },
      })
    }
  } catch (error) {
    next(error)
  }
})

// update article
articleRouter.post("/update", async (req, res, next) => {
  let {
    id,
    title,
    author_id,
    content,
    tags,
    main_pic,
    short_intro,
    classify
  } = req.body;
  // 先根据id查找，找到才更新
  try {
    let article = await models.Article.findOne({
      where: {
        id,
        author_id
      }
    })
    if(article){
      article = article.update({
        title,
        content,
        tags,
        main_pic,
        short_intro,
        classify
      })
      res.json({
        code: 0,
        msg: "update success",
        article
      })
    }else{
      res.json({
        code: -1,
        msg: "not found",
      })
    }
  } catch (error) {
    next(error)
  }
})

// 添加article
articleRouter.post("/add", async (req, res) => {
  let {
    title,
    author_id,
    content,
    tags,
    main_pic,
    short_intro,
    classify
  } = req.body;
  let article = await models.Article.create({
    aid: +new Date(),
    title,
    author_id,
    content,
    tags,
    main_pic,
    short_intro,
    classify
  })
  res.json({
    code: 0,
    msg: "add success",
    article
  })
})
module.exports = articleRouter;