const express = require("express")
const multer = require("multer")
const util = require("../utils/util")
const path = require("path")
const allowAccess = require("../middleware/allowAccess")

const uploadRouter = express.Router()

const uploadFolder = (n) => {
  return path.resolve(__dirname, `../../static/upload/${n}`)
}
// 根据不同的业务需求，处理不同的storage
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    let extName = file.originalname.split(".")[1];
    await util.createFolder(uploadFolder(extName));
    cb(null, uploadFolder(extName));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({
  fileFilter: (req, file, cb) => {
    // 如果file的扩展名不符合要求
    // 通过cb(new Error过滤)
    // 或者直接cb(null, false)
    // 符合要求的进行cb(null, true)
    // cb(new Error('扩展名不正确'));
    cb(null, true);
  },
  storage: storage
})

uploadRouter.post("/uploadImage", allowAccess, upload.any(), (req, res) => {
  let files = req.files;
  let p = []
  files.forEach(item => {
    let { destination, filename } = item;
    let ps = `http://127.0.0.1:5000${destination.slice(destination.indexOf("static") + 6)}\\${filename}`;
    ps = ps.split("\\").join("/")
    p.push(ps)
  })
  res.json({
    "errno": 0,
    "data": p
  })
})

module.exports = uploadRouter;
