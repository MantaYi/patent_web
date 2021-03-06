//引入express插件
const express = require('express');
//引入知识模块
const Knowledge = require('../db/model/knowledgeModel');

//路由实例化
const router = express.Router();

//知识查看search
router.get('/search', (req, res) => {
  Knowledge.find({}).then(data => {
      res.send({
        err: 0,
        msg: '知识查找成功',
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

//知识按领域查找searchByArea
router.post('/searchByArea', (req, res) => {
  let knowledgeArea = req.body.knowledgeArea;
  Knowledge.find({
    knowledgeArea
  }).then(data => {
    res.send({
      err: 0,
      msg: '知识查找成功',
      data
    })
  }).catch(err => {
    res.send({
      err: -99,
      msg: '服务器错误'
    })
  })
})

//知识按关键字查找searchByKeyword
router.post('/searchByKeyword', (req, res) => {
  let keyword = req.body.keyword;
  let regExp = new RegExp(`${keyword}`);
  Knowledge.find({
    knowledgeContent: regExp
  }).then(data => {
    res.send({
      err: 0,
      msg: '知识查找成功',
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
