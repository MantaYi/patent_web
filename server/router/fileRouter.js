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
  let {
    size,
    mimetype
  } = req.file;
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
      if (data.length != 0) {
        res.send({
          err: 0,
          msg: '文件查找成功',
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
        err: -98,
        msg: '数据库错误',
      });
    });
});

//文件上传upload
router.post('/upload', (req, res) => {
  let {
    filePath,
    fileName,
    filePrice,
    fileArea,
    filePatentType,
    token
  } = req.body;
  if (token) {
    let data = verifyToken(token);
    User.find({
        userName: data.userName,
        password: data.password
      }).then(data => {
        if (data.length != 0) {
          let fileOwner = data[0].userName;
          File.insertMany({
              filePath,
              fileName,
              fileOwner,
              filePrice,
              fileArea,
              filePatentType,
            })
            .then((_) => {
              File.find({
                filePath,
                fileName,
                fileOwner,
                filePrice,
                fileArea,
                filePatentType,
              }).then(fileData => {
                let userUploadFiles;
                if (data[0].userUploadFiles.length != 0) {
                  userUploadFiles = data[0].userUploadFiles;
                } else {
                  userUploadFiles = [0];
                }
                userUploadFiles.push(fileData[0]._id);
                let userUpdates = {
                  $set: {
                    userUploadFiles
                  }
                }
                User.find(data[0]).then(data => {
                  User.updateOne(data[0], userUpdates).then(_ => {
                    res.send({
                      err: 0,
                      msg: '文件上传成功',
                    });
                  })
                })
              })
            })
        } else {
          res.send({
            err: -2,
            msg: '未查找到用户'
          })
        }
      })
      .catch((err) => {
        console.log(err);
        res.send({
          err: -98,
          msg: '数据库出错',
        });
      });
  } else {
    res.send({
      err: -1,
      msg: '用户未登录'
    })
  }
});

//文件按领域查找searchByArea
router.get('/searchByArea', (req, res) => {
  let fileArea = req.query.fileArea;
  File.find({
      fileArea,
    })
    .then((data) => {
      if (data.length != 0) {
        res.send({
          err: 0,
          msg: '文件查找成功',
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
  let filePatentType = req.query.filePatentType;
  File.find({
      filePatentType,
    })
    .then((data) => {
      if (data.length != 0) {
        res.send({
          err: 0,
          msg: '文件查找成功',
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
      if (data.length != 0) {
        res.send({
          err: 0,
          msg: '文件查找成功',
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
router.post('/purchase', (req, res) => {
  let {
    fileId,
    filePrice,
    token
  } = req.body;
  File.find({
      _id: fileId
    }).then(fileData => {
      if (fileData.length != 0) {
        let tokenData = verifyToken(token);
        User.find({
          userName: tokenData.userName,
          password: tokenData.password
        }).then(userData => {
          if (userData.length != 0) {
            let userHasFiles, userScore, filePurchaseTimes;
            if (userData[0].userHasFiles.length != 0) {
              userHasFiles = userData[0].userHasFiles;
              userHasFiles.push(fileId);
            } else {
              userHasFiles = [];
            }
            if (userData[0].userScore < filePrice || userData[0].userScore == 0) {
              res.send({
                err: -3,
                msg: '用户积分不足'
              })
            } else {
              userScore = userData[0].userScore - filePrice;
            }
            let userUpdates = {
              $set: {
                userHasFiles,
                userScore
              }
            }
            filePurchaseTimes = fileData[0].filePurchaseTimes + 1;
            let fileUpdates = {
              $set: {
                filePurchaseTimes
              }
            }
            File.updateOne(fileData[0], fileUpdates).then(_ => {})
            User.find({
              userName: tokenData.userName,
              password: tokenData.password
            }).then(data => {
              User.updateOne(data[0], userUpdates).then(_ => {
                res.send({
                  err: 0,
                  msg: '文件购买成功'
                })
              })
            })
          } else {
            res.send({
              err: -2,
              msg: '用户不存在'
            })
          }
        })
      } else {
        res.send({
          err: -1,
          msg: '文件不存在'
        })
      }
    })
    .catch(err => {
      res.send({
        err: -99,
        msg: '服务器错误'
      })
    })
})

//下载文件download
router.post('/download', (req, res) => {
  if (req.body.token) {
    let data = verifyToken(req.body.token);
    let {
      fileId
    } = req.body;
    User.find({
      userName: data.userName,
      password: data.password
    }).then((data) => {
      if (data.length != 0) {
        if (data[0].userHasFiles.indexOf(fileId) != -1) {
          File.find({
            _id: fileId
          }).then((data) => {
            if (data.length != 0) {
              let {
                filePath
              } = data[0];
              res.send({
                err: 0,
                msg: '文件可下载',
                filePath,
              });
            } else {
              res.send({
                err: -4,
                msg: '要下载的文件不存在'
              })
            }
          });
        } else {
          res.send({
            err: -2,
            msg: '请先购买文件',
          });
        }
      } else {
        res.send({
          err: -3,
          msg: '用户不存在'
        })
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
router.get('/inform', (req, res) => {
  let fileId = req.query.fileId;
  File.find({
      _id: fileId
    })
    .then((data) => {
      if (data.length != 0) {
        let fileData = data[0];
        let updates = {
          $set: {
            fileInformTimes: fileData.fileInformTimes + 1,
          },
        };
        File.updateOne(fileData, updates)
          .then((_) => {
            res.send({
              err: 0,
              msg: '文件举报成功',
            });
          })
      } else {
        res.send({
          err: -1,
          msg: '文件不存在'
        })
      }
    })
    .catch((err) => {
      console.log(err);
      res.send({
        err: -99,
        msg: '服务器错误',
      });
    });
});

//路由导出
module.exports = router;
