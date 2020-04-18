//引入express插件
const express = require('express');
//引入jsonwebtoken
const jwt = require('jsonwebtoken');
//引入专利模块
const Patent = require('../db/model/patentModel');
//引入用户模块
const User = require('../db/model/userModel');

//实例化路由
const router = express.Router();

//解密token的方法
function verifyToken(token) {
  let secret = 'PFUSecret';
  let data = jwt.verify(token, secret);
  return data;
}

//专利申请apply
router.post('/apply', (req, res) => {
  let {
    patentName,
    patentContent,
    patentApplicantLocation,
    patentFile,
    patentType,
    patentArea,
    token
  } = req.body;
  let data = verifyToken(token);
  User.find({
      userName: data.userName,
      password: data.password
    }).then(data => {
      if (data.length != 0) {
        let userData = data[0];
        let patentApplicant = userData.userName;
        Patent.insertMany({
          patentName,
          patentApplicant,
          patentContent,
          patentApplicantLocation,
          patentFile,
          patentType,
          patentArea
        });
        Patent.find({
          patentName,
          patentApplicant,
          patentContent,
          patentApplicantLocation,
          patentFile,
          patentType,
          patentArea
        }).then(data => {
          if (data.length != 0) {
            let userPatent = userData.userPatent;
            userPatent.push(data[0]._id);
            console.log(userPatent);
            console.log(userData.userPatent);
            let updates = {
              $set: {
                userPatent
              }
            }
            User.find(userData).then(data => {
              User.updateOne(data[0], updates).then(_ => {
                res.send({
                  err: 0,
                  msg: '专利申请完成'
                })
              })
            })
          } else {
            res.send({
              err: -2,
              msg: '专利不存在'
            })
          }
        })
      } else {
        res.send({
          err: -1,
          msg: '用户不存在'
        })
      }
    })
    .catch(err => {
      console.log(err);
      res.send({
        err: -99,
        msg: '服务器出错'
      })
    })
})

//专利查看search
router.get('/search', (req, res) => {
  Patent.find({}).then(data => {
      res.send({
        err: 0,
        msg: '专利查找成功',
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

//专利按领域查找searchByArea
router.get('/searchByArea', (req, res) => {
  let patentArea = req.query.patentArea;
  Patent.find({
    patentArea
  }).then(data => {
    res.send({
      err: 0,
      msg: '专利查找成功',
      data
    })
  }).catch(err => {
    res.send({
      err: -99,
      msg: '服务器错误'
    })
  })
})

//专利按类型查找searchByType
router.get('/searchByType', (req, res) => {
  let patentType = req.query.patentType;
  Patent.find({
    patentType
  }).then(data => {
    res.send({
      err: 0,
      msg: '专利查找成功',
      data
    })
  }).catch(err => {
    res.send({
      err: -99,
      msg: '服务器错误'
    })
  })
})

//专利按关键字查找searchByKeyword
router.get('/searchByKeyword', (req, res) => {
  let keyword = req.query.keyword;
  let regExp = new RegExp(`${keyword}`);
  console.log(regExp);
  Patent.find({
    patentContent: regExp
  }).then(data => {
    res.send({
      err: 0,
      msg: '专利查找成功',
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
