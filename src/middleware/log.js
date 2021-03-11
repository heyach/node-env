const util = require("../utils/util")
const fs = require("fs")
const ps = require("path")

// 日志中间件，记录所有的请求
module.exports = (req, res, next) => {
  let { path, ip, query, method } = req;
  let time = new Date();
  let d = util.TimeFormat("yyyyMMdd")
  let p = `../../logs/${d}.log`;
  let content = `来自${ip}的请求${path}进来了，方法是${method}，参数是 ${JSON.stringify(query)}，时间是${time}; \n`
  try {
    fs.writeFile(ps.resolve(__dirname, p), content, { flag: "a" }, (err) => {
      next(err)
    });
  } catch (error) {
    next(error)
  }
}