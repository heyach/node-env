const express = require("express")
const logger = require("./middleware/log")
const notFound = require("./middleware/notFound")
const error = require("./middleware/error")
const allowAccess = require("./middleware/allowAccess")
const bodyParser = require("body-parser")

const {
  uploadRouter,
  userRouter,
  articleClassifyRouter,
  articleRouter,
  loginRouter,
  articleCommentRouter
} = require("./api/index")

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.use(logger);
app.use(allowAccess)

app.use("/upload", uploadRouter);
app.use("/user", userRouter);
app.use("/classify", articleClassifyRouter);
app.use("/comment", articleCommentRouter);
app.use("/article", articleRouter);
app.use("/login", loginRouter);

// 第一个参数的路径为package.json的相对路径
app.use(express.static("static", {
  extensions: ["html", "htm", "png", "jpeg"]
}))

app.use(notFound)
app.use(error)

app.listen(5000, "127.0.0.1", () => {
  console.log("server start at 127.0.0.1:5000")
})