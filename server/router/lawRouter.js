//引入express插件
const express = require('express');
//引入法规模块
const Law = require('../db/model/lawModel');

//实例化路由
const router = express.Router();

//法规查看search
router.get('/search', (req, res) => {
  Law.find({}).then(data => {
      res.send({
        err: 0,
        msg: '法规查找成功',
        data
      })
    })
    .catch(err => {
      res.send({
        err: -99,
        msg: '服务器错误'
      })
    })
})

//法规按领域查找searchByArea
router.post('/searchByArea', (req, res) => {
  let lawArea = req.body.lawArea;
  Law.find({
    lawArea
  }).then(data => {
    res.send({
      err: 0,
      msg: '法规查找成功',
      data
    })
  }).catch(err => {
    res.send({
      err: -99,
      msg: '服务器错误'
    })
  })
})

//法规按类型查找searchByType
router.post('/searchByType', (req, res) => {
  let lawPatentType = req.body.lawPatentType;
  Law.find({
    lawPatentType
  }).then(data => {
    res.send({
      err: 0,
      msg: '法规查找成功',
      data
    })
  }).catch(err => {
    res.send({
      err: -99,
      msg: '服务器错误'
    })
  })
})

//法规按关键词查找searchByKeyword
router.post('/searchByKeyword', (req, res) => {
  let keyword = req.body.keyword;
  let regExp = new RegExp(`${keyword}`);
  Law.find({
    lawContent: regExp
  }).then(data => {
    res.send({
      err: 0,
      msg: '法规查找成功',
      data
    })
  }).catch(err => {
    res.send({
      err: -99,
      msg: '服务器错误'
    })
  })
})

//路由导出
module.exports = router;
