//引入express插件
const express = require('express');
//引入新闻模块
const News = require('../db/model/newsModel');

//实例化路由
const router = express.Router();

//新闻查看search
router.get('/search', (req, res) => {
  News.find({}).then(data => {
      res.send({
        err: 0,
        msg: '新闻查找成功',
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

//新闻按领域查找searchByArea
router.post('/searchByArea', (req, res) => {
  let newsArea = req.body.newsArea;
  News.find({
    newsArea
  }).then(data => {
    res.send({
      err: 0,
      msg: '新闻查找成功',
      data
    })
  }).catch(err => {
    res.send({
      err: -99,
      msg: '服务器错误'
    })
  })
})

//新闻按关键词查找searchByKeyword
router.post('/searchByKeyword', (req, res) => {
  let keyword = req.body.keyword;
  let regExp = new RegExp(`${keyword}`);
  News.find({
    newsContent: regExp
  }).then(data => {
    res.send({
      err: 0,
      msg: '新闻查找成功',
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
