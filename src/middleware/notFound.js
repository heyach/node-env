// 处理404，放在所有路由处理的后面，没匹配到则转到这里
module.exports = (req, res, next) => {
  res.status(404)
  res.json({
    code: -1,
    msg: "资源不存在"
  })
}