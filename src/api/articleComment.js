const express = require("express");
const models = require("../../db/models")

const articleCommentRouter = express.Router()

// 添加comment
articleCommentRouter.post("/add", async (req, res) => {
  let {
    article_id,
    user_id,
    content,
    user_name,
    user_head_pic
  } = req.body;
  let articleComment = await models.ArticleComment.create({
    article_id,
    user_id,
    content,
    user_name,
    user_head_pic,
    up_num: 0
  })
  res.json({
    code: 0,
    msg: "add success",
    data: articleComment
  })
})
// 
// articleCommentRouter.get("/list", async (req, res) => {
// let articleClassify = await models.ArticleClassify.findAll()
// res.json({
//   code: 0,
//   msg: "add success",
//   data: articleClassify
// })
// })
module.exports = articleCommentRouter;