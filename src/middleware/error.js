// 错误处理中间件，需要放在最后面
module.exports = (err, req, res, next) => {
  // 异常处理，写入日志等等
  if (err) {
    let { message } = err;
    res.status(500)
    res.json({
      code: -2,
      msg: `${message} || 服务器错误`
    })
  } else {
    next()
  }
}