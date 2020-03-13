//引用express
const express = require('express')
//引入multer
const multer = require('multer')

//实例化路由
const router = express.Router()
//multer配置
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //指定文件路径
    cb(null, './static/img')
  },
  filename: function (req, file, cb) {
    //指定文件名
    //获取数据
    let exts = file.originalname.split('.')
    let ext = exts[exts.length - 1]
    let tmpName = (new Date()).getTime() + (parseInt(Math.random() * 9999) + '')
    cb(null, `${tmpName}.${ext}`)
  }
})
var upload = multer({
  storage: storage
})

//上传图片
//上传图片和一些比较大的文件时必须用post方法
router.post('/upload', upload.single('file'), (req, res) => {
  //file 表示要上传的图片数据的key值 必须前后端保持一致
  //获取数据
  let {
    size,
    mimeType,
    path
  } = req.file
  //定义允许上传的数据类型
  let types = ['jpg', 'jpeg', 'png', 'gif']
  //使用split函数提取出文件的类型/后缀名
  let tmpType = mimeType.split('/')[1]
  if (size > 500000) {
    return res.send({
      err: -1,
      msg: '上传文件过大'
    })
  } else if (types.indexOf(tmpType) == -1) {
    return res.send({
      err: -2,
      msg: '媒体类型错误'
    })
  } else {
    let url = `/public/img/${req.file.filename}`
    res.send({
      err: 0,
      msg: '上传成功',
      img: url
    })
  }
})


//路由导出
module.exports = router
