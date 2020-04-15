//引入express
const express = require('express');
//引入http模块
const http = require('http');
//引入jsonwebtoken
const jwt = require('jsonwebtoken');
//引入用户模型
const User = require('../db/model/userModel');
//引入文件模型
const File = require('../db/model/fileModel');
//引入专利模型
const Patent = require('../db/model/patentModel');

//实例化路由
const router = express.Router();

//生成token的方法
function generateToken(data) {
  let secret = 'PFUSecret';
  let token = jwt.sign(data, secret);
  return token;
}

//解密token的方法
function verifyToken(token) {
  let secret = 'PFUSecret';
  let data = jwt.verify(token, secret);
  return data;
}

//注册逻辑
router.post('/reg', (req, res) => {
  //获取数据
  let {
    userName,
    password,
    userEmail,
    userPhone
  } = req.body;
  // if (!userEmail) userEmail = null;
  // if (!userPhone) userPhone = null;
  //判断用户名是否存在
  User.find({
      userName
    })
    .then((data) => {
      if (data.length === 0) {
        //用户名不存在，可以注册
        User.insertMany({
          userName,
          password,
          userEmail,
          userPhone
        });
      } else {
        res.send({
          err: -2,
          msg: '用户名已存在',
        });
      }
    })
    .then(_ => {
      let data = {
        userName,
        password
      };
      let token = generateToken(data);
      res.send({
        err: 0,
        msg: '注册成功',
        token,
      });
    })
    .catch((err) =>
      res.send({
        err: -1,
        msg: '注册失败',
      })
    );
});

//登录逻辑
router.post('/login', (req, res) => {
  if (req.body.token) {
    let data = verifyToken(req.body.token);
    res.send(data.userName);
  } else {
    //获取数据
    let {
      userName,
      password
    } = req.body;
    User.find({
        userName
      })
      .then((data) => {
        if (data.length == 0) {
          res.send({
            err: -1,
            msg: '用户名不存在',
          });
        } else if (data.length == 1) {
          if (data[0].userName == userName && data[0].password == password) {
            let temp = data[0];
            let token = generateToken(temp);
            res.send({
              err: 0,
              msg: '登录成功',
              token,
            });
          } else {
            res.send({
              err: -2,
              msg: '密码不正确',
            });
          }
        }
      })
      .catch((err) =>
        res.send({
          err: -99,
          msg: '服务器出错',
        })
      );
  }
});

//查看信息操作
router.post('/myInfo', (req, res) => {
  if (req.body.token) {
    let data = verifyToken(req.body.token);
    User.find(data).then((data) => {
      if (data.length == 0) {
        res.send({
          err: -2,
          msg: '未查找到数据',
        });
      } else {
        let resData = data[0];
        res.send({
          err: 0,
          msg: '查找成功',
          data: resData,
        });
      }
    });
  } else {
    res.send({
      err: -1,
      msg: '用户未登录',
    });
  }
});

//查看文件查找
router.post('/myFile', (req, res) => {
  if (req.body.token) {
    let data = verifyToken(req.body.token);
    User.find(data)
      .then((data) => {
        let userHasFiles = [];
        let userUploadFiles = [];
        data.userHasFiles.forEach((item) => {
          let tempData = {
            _id: item
          };
          let resData = File.find(tempData);
          if (resData) {
            userHasFiles.push(resData);
          }
        });
        data.userUploadFiles.forEach((item) => {
          let tempData = {
            _id: item
          };
          let resData = File.find(tempData);
          if (resData) {
            userUploadFiles.push(resData);
          }
        });
        res.send({
          err: 0,
          msg: '查找成功',
          userHasFiles,
          userUploadFiles,
        });
      })
      .catch((err) => {
        res.send({
          err: -98,
          msg: '数据库出错',
        });
      });
  } else {
    res.send({
      err: -1,
      msg: '用户未登录',
    });
  }
});

//查看专利操作
router.post('/myPatent', (req, res) => {
  if (req.body.token) {
    let data = verifyToken(req.body.token);
    User.find(data)
      .then((data) => {
        let userPatent = [];
        data.userPatent.forEach((item) => {
          let tempData = {
            _id: item
          };
          let resData = Patent.find(tempData);
          if (resData) {
            userPatent.push(resData);
          }
        });
        res.send({
          err: 0,
          msg: '查找成功',
          userPatent,
        });
      })
      .catch((err) => {
        res.send({
          err: -98,
          msg: '数据库出错',
        });
      });
  } else {
    res.send({
      err: -1,
      msg: '用户未登录',
    });
  }
});

//修改信息操作
router.post('/infoChange', (req, res) => {
  if (req.body.token) {
    let {
      userName,
      password,
      userEmail,
      userPhone,
      token
    } = req.body;
    let data = verifyToken(token);
    User.find(data).then(data => {
      if (data.length != 0) {
        res.send({
          err: -2,
          msg: '该用户名已注册'
        })
      } else {
        let updates = {
          $set: {
            userName,
            password,
            userEmail,
            userPhone
          }
        };
        User.update(data, updates).then(_ => {
            let data = {
              userName,
              password
            };
            let token = generateToken(data);
            res.send({
              err: 0,
              msg: '修改成功',
              token
            })
          })
          .catch(err => {
            res.send({
              err: -98,
              msg: '数据库出错'
            })
          })
      }
    })
  } else {
    res.send({
      err: -1,
      msg: '用户未登录'
    })
  }
})

module.exports = router;
