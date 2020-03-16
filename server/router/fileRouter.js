const express = require("express"); //引入express模块，用于接口编写
const multer = require("multer"); //引入multer模块，用于文件上传
const fs = require("fs"); //直接引入文件系统模块

let storage = multer.diskStorage({
  //文件存储路径
  destination: function (req, file, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    let ifo = file.originalname.split(".");
    let fileLast = ifo[ifo.length - 1];
    let fileName = new Date().getTime() + (parseInt(Math.random() * 9999) + "");
    cb(null, `${fileName}.${fileLast}`);
  }
});
let upload = multer({
  storage
});
//实例化路由
const router = express.Router();

//单文件上传
router.post("/upload", upload.single("file"), function (req, res, next) {
  console.log(req.file)
  let {
    size,
    mimetype,
    path
  } = req.file
  //定义允许上传的文件类型
  let types = ['jpg', 'jpeg', 'png', 'gif', 'docx', 'pdf']
  //提取文件后缀
  let tmpType = mimetype.split('/')[1]
  if (size > 500000) {
    return res.send({
      err: -1,
      msg: '上传文件过大'
    })
  } else if (types.indexOf(tmpType) == -1) {
    return res.send({
      err: -2,
      msg: '不合规范的文件类型'
    })
  } else {
    let url = `/public/img/${req.file.filename}`
    res.send({
      err: 0,
      msg: '上传成功',
      img: url
    })
  }
});

//路由导出
module.exports = router;
