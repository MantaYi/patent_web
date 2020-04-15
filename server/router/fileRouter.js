//引入express模块，用于接口编写
const express = require('express');
//引入multer模块，用于文件上传
const multer = require('multer');
//引入jsonwebtoken
const jwt = require('jsonwebtoken');
//引入文件模型
const File = require('../db/model/fileModel');
//引入用户模型
const User = require('../db/model/userModel');

//文件存储配置
let storage = multer.diskStorage({
  //文件存储路径
  destination: (req, file, cb) => {
    cb(null, './upload');
  },
  filename: (req, file, cb) => {
    let ifo = file.originalname.split('.');
    let fileLast = ifo[ifo.length - 1];
    let fileName = new Date().getTime() + (parseInt(Math.random() * 9999) + '');
    cb(null, `${fileName}.${fileLast}`);
  },
});
let upload = multer({
  storage,
});

//实例化路由
const router = express.Router();

//解密token的方法
function verifyToken(token) {
  let secret = 'PFUSecret';
  let data = jwt.verify(token, secret);
  return data;
}

//单文件上传
router.post('/fileUpload', upload.single('file'), (req, res, next) => {
  let { size, mimetype, path } = req.file;
  //定义允许上传的文件类型
  let types = ['jpg', 'jpeg', 'png', 'gif', 'docx', 'pdf'];
  //提取文件后缀
  let tmpType = mimetype.split('/')[1];
  if (size > 500000) {
    res.send({
      err: -1,
      msg: '上传文件过大',
    });
  } else if (types.indexOf(tmpType) == -1) {
    res.send({
      err: -2,
      msg: '不合规范的文件类型',
    });
  } else {
    let url = `/upload/${req.file.filename}`;
    res.send({
      err: 0,
      msg: '上传成功',
      url,
    });
  }
});

//文件查看search
router.get('/search', (req, res) => {
  File.find({})
    .then((data) => {
      if (data) {
        res.send({
          err: 0,
          msg: '查找成功',
          data,
        });
      } else {
        res.send({
          err: -1,
          msg: '无数据',
        });
      }
    })
    .catch((err) => {
      res.send({
        err: -2,
        msg: '数据库错误',
      });
    });
});

//文件上传upload
router.post('/upload', (req, res) => {
  let {
    filePath,
    fileName,
    fileOwner,
    filePrice,
    fileArea,
    filePatentType,
  } = req.body;
  File.insertMany({
    filePath,
    fileName,
    fileOwner,
    filePrice,
    fileArea,
    filePatentType,
  })
    .then((_) => {
      res,
        send({
          err: 0,
          msg: '文件上传成功',
        });
    })
    .catch((err) => {
      res.send({
        err: -98,
        msg: '数据库出错',
      });
    });
});

//文件按领域查找searchByArea
router.get('/searchByArea', (req, res) => {
  let query = req.query;
  let fileArea = query.fileArea;
  File.find({
    fileArea,
  })
    .then((data) => {
      if (data) {
        res.send({
          err: 0,
          msg: '查找成功',
          data,
        });
      } else {
        res.send({
          err: -1,
          msg: '无相关数据',
        });
      }
    })
    .catch((err) => {
      res.send({
        err: -99,
        msg: '服务器错误',
      });
    });
});

//文件按类型查找searchByType
router.get('/searchByType', (req, res) => {
  let query = req.query;
  let filePatentType = query.filePatentType;
  File.find({
    filePatentType,
  })
    .then((data) => {
      if (data) {
        res.send({
          err: 0,
          msg: '查找成功',
          data,
        });
      } else {
        res.send({
          err: -1,
          msg: '无相关数据',
        });
      }
    })
    .catch((err) => {
      res.send({
        err: -99,
        msg: '服务器错误',
      });
    });
});

//文件按下载次数查找searchByDownloadTimes
router.get('/searchByDownloadTimes', (req, res) => {
  File.find({})
    .sort({
      fileDownloadTimes: -1,
    })
    .then((data) => {
      if (data) {
        res.send({
          err: 0,
          msg: '查找成功',
          data,
        });
      } else {
        res.send({
          err: -1,
          msg: '无相关数据',
        });
      }
    })
    .catch((err) => {
      res.send({
        err: -99,
        msg: '服务器错误',
      });
    });
});

//购买文件purchase
router.post('purchase', (req, res) => {
  if (req.body.token) {
    let data = verifyToken(req.body.token);
    let { fileId, filePrice } = req.body;
    User.find(data).then((data) => {
      let userData = data[0];
      if (userData.userScore < filePrice) {
        res.send({
          err: -2,
          msg: '剩余积分不足',
        });
      } else {
        let updates = {
          $set: {
            userScore: userData.userScore - filePrice,
            userHasFile: userData.userHasFile.push(fileId),
          },
        };
        User.update(userData, updates)
          .then((_) => {
            res.send({
              err: 0,
              msg: '文件购买成功',
            });
          })
          .catch((err) => {
            res.send({
              err: -98,
              msg: '数据库错误',
            });
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

//下载文件download
router.post('download', (req, res) => {
  if (req.body.token) {
    let data = verifyToken(req.body.token);
    let { fileId } = req.body;
    User.find(data).then((data) => {
      if (data[0].userHasFile.indexOf(fileId) != -1) {
        File.find(fileId).then((data) => {
          let { filePath } = data[0];
          res.send({
            err: 0,
            msg: '文件可下载',
            filePath,
          });
        });
      } else {
        res.send({
          err: -2,
          msg: '请先购买文件',
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

//举报文件inform
router.get('inform', (req, res) => {
  let fileId = req.query.fileId;
  File.find(fileId)
    .then((data) => {
      let fileData = data[0];
      let updates = {
        $set: {
          fileInformTimes: fileInformTimes + 1,
        },
      };
      File.update(fileData, updates)
        .then((_) => {
          res.send({
            err: 0,
            msg: '文件举报成功',
          });
        })
        .catch((err) => {
          res.send({
            err: -98,
            msg: '数据库错误',
          });
        });
    })
    .catch((err) => {
      res.send({
        err: -98,
        msg: '数据库错误',
      });
    });
});

//路由导出
module.exports = router;
