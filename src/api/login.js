const express = require("express");
const models = require("../../db/models")
const allowAccess = require("../middleware/allowAccess")

const loginRouter = express.Router()

// login
loginRouter.get("/login", allowAccess, async (req, res) => {
  let {
    name,
    password
  } = req.query;
  if (!name || !password) {
    res.json({
      code: -1,
      msg: "name or password empty"
    })
    return
  }
  let user = await models.User.findOne({
    where: {
      name,
      password
    }
  })
  if (user) {
    res.json({
      code: 0,
      msg: "add success",
      data: {
        id: user.id,
        uid: user.uid,
        name: user.name,
        avatar: user.avatar,
      }
    })
  } else {
    user = await models.User.create({
      uid: +new Date() % 10000000,
      name,
      password,
      status: 1,
      role: 2,
      avatar: "http://img2.mukewang.com/5ff529550925a7bd05400304.png"
    })
    res.json({
      code: 0,
      msg: "create user success",
      data: {
        id: user.id,
        uid: user.uid,
        name: user.name,
        avatar: user.avatar,
      }
    })
  }
})
module.exports = loginRouter