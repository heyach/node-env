const express = require("express");
const models = require("../../db/models")

const articleClassifyRouter = express.Router()


// 添加tag
articleClassifyRouter.post("/add", async (req, res) => {
  let {
    name,
    parent_id
  } = req.body;
  let articleClassify = await models.ArticleClassify.create({
    name: name,
    parent_id: parent_id ? parent_id : 0,
  })
  res.json({
    code: 0,
    msg: "add success",
    data: articleClassify
  })
})
// 
articleClassifyRouter.get("/list", async (req, res) => {
  let articleClassify = await models.ArticleClassify.findAll()
  res.json({
    code: 0,
    msg: "add success",
    data: articleClassify
  })
})
module.exports = articleClassifyRouter;