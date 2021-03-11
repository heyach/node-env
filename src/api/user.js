const express = require("express");
const models = require("../../db/models")
const allowAccess = require("../middleware/allowAccess")

const userRouter = express.Router()

// 获取菜单
userRouter.get("/menu", async (req, res) => {
  let menu = [
    {
      index: "0",
      name: "首页",
      route: "/",
      disabled: false,
      children: []
    },
    {
      index: "1",
      name: "文章列表",
      route: "/article",
      disabled: false,
      children: []
    },
    {
      index: "2",
      name: "练习",
      icon: "el-icon-location",
      children: [
        {
          index: "10",
          name: "todolist",
          route: "/todolist",
          disabled: false,
        },
        {
          index: "11",
          name: "styleclass",
          route: "/styleclass",
          disabled: false,
        },
        {
          index: "12",
          name: "vuexaxios",
          route: "/vuexaxios",
          disabled: false,
        },
        {
          index: "13",
          name: "numberbox",
          route: "/numberbox",
          disabled: false,
        },
        {
          index: "14",
          name: "slot",
          route: "/slot",
          disabled: false,
        },
        {
          index: "15",
          name: "elementui",
          route: "/elementui",
          disabled: false,
        },
        {
          index: "16",
          name: "ali-icon",
          route: "/aliicon",
          disabled: false,
        },
        {
          index: "17",
          name: "clearfloat原理",
          route: "/clearfloat",
          disabled: false,
        }
      ]
    },
    {
      index: "3",
      name: "算法",
      icon: "el-icon-help",
      children: [
        {
          index: "21",
          name: "洗牌算法",
          route: "/shuffle",
          disabled: false,
        },
        {
          index: "22",
          name: "冒泡排序",
          route: "/bubblesort",
          disabled: false,
        },
        {
          index: "23",
          name: "快速排序",
          route: "/quicksort",
          disabled: false,
        }
      ]
    },
    {
      index: "4",
      name: "一个被禁用的菜单",
      route: "/",
      disabled: true,
      children: []
    }
  ]
  res.json({
    code: 0,
    data: menu
  })
})

// 获取用户信息byid
userRouter.get("/:id", allowAccess, async (req, res) => {
  let { id } = req.params;
  if (!id) {
    res.json({
      code: -1,
      msg: "id empty!"
    })
    return
  }
  try {
    let user = await models.User.findOne({
      where: {
        uid: id
      },
      attributes: { exclude: ['password'] },
    })
    if (user) {
      res.json({
        code: 0,
        msg: "query ok",
        data: user
      })
    } else {
      res.json({
        code: -1,
        msg: "user not exist",
      })
    }
  } catch (error) {
    next(error)
  }
})

// edit user 
userRouter.post("/update", async (req, res, next) => {
  let {
    uid,
    name,
    password,
    realname,
    address,
    mobile,
    notes,
    avatar
  } = req.body;
  // 先根据id查找，找到才更新
  try {
    let user = await models.User.findOne({
      where: {
        uid,
      }
    })
    if(user){
      user = user.update({
        uid: uid,
        name,
        password,
        realname,
        address,
        mobile,
        notes,
        avatar
      })
      res.json({
        code: 0,
        msg: "update success",
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
// 添加一个user
userRouter.post("/register", async (req, res) => {
  let {
    name,
    apassword,
    password,
    realname,
    address,
    status,
    role,
    mobile,
    notes
  } = req.body;
  if (!name || !password) {
    res.json({
      code: -1,
      msg: "name or password empty!"
    })
    return
  }
  if (password != apassword) {
    res.json({
      code: -1,
      msg: "重复密码错误"
    })
    return
  }
  let user = await models.User.create({
    uid: +new Date() % 10000000,
    name,
    password,
    realname,
    address,
    status: status || 1,
    role: role || 1,
    mobile,
    notes
  })
  res.json({
    code: 0,
    msg: "register success",
    user
  })
})
module.exports = userRouter;