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
  console.log(req.session);
  let {
    userName,
    password
  } = req.body;
  User.find({
      userName,
      password
    })
    .then(data => {
      if (data.length > 0) {
        //登录成功后将用户的相关信息存到session
        req.session.login = true;
        req.session.name = userName;
        console.log(req.session);
        res.send({
          err: 0,
          msg: '登录成功'
        });
      } else {
        res.send({
          err: -2,
          msg: '用户名或者密码不正确'
        });
      }
    })
    .catch(err => res.send({
      err: -1,
      msg: '内部错误'
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
