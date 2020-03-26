//引入express
const express = require('express');
//引入用户模型
const User = require('../db/model/userModel');

//实例化路由
const router = express.Router();

//注册逻辑
router.post('/reg', (req, res) => {
  //获取数据
  let {
    userName,
    password
  } = req.body;
  //判断用户名是否存在
  User.find({
      userName
    })
    .then(data => {
      if (data.length === 0) {
        //用户名不存在，可以注册
        return User.insertMany({
          userName,
          password
        });
      } else {
        res.send({
          err: -2,
          msg: '用户名已存在'
        });
      }
    })
    .then(() => res.send({
      err: 0,
      msg: '注册成功'
    }))
    .catch(err => res.send({
      err: -1,
      msg: '注册失败'
    }))
});

//登录逻辑
router.post('/login', (req, res) => {
  //获取数据
  let {
    userName,
    password
  } = req.body;
  User.find({
      userName,
      password
    })
    .then(data => {
      if (data.length == 0) {
        res.send({
          err: -1,
          msg: '用户名不存在'
        });
      } else if (data.length == 1) {
        if (data[0].userName == userName && data[0].password == password) {
          //登录成功后将用户的相关信息存到session
          req.session.login = true;
          req.session.name = userName;
          res.send({
            err: 0,
            msg: '登录成功'
          });
        } else {
          res.send({
            err: -2,
            msg: '密码不正确'
          });
        }
      }
    })
    .catch(err => res.send({
      err: -99,
      msg: '服务器出错'
    }))
});

//登出逻辑
router.post('/logout', (req, res) => {
  //销毁保存的session
  req.session.destroy();
  res.send({
    err: 0,
    msg: '成功登出'
  });
});

module.exports = router;
