//引入express插件
const express = require('express');
//引入jsonwebtoken插件
const jwt = require('jsonwebtoken');
//引入文件模块
const File = require('../db/model/fileModel');
//引入知识模块
const Knowledge = require('../db/model/knowledgeModel');
//引入法规模块
const Law = require('../db/model/lawModel');
//引入新闻模块
const News = require('../db/model/newsModel');
//引入专利模块
const Patent = require('../db/model/patentModel');
//引入用户模块
const User = require('../db/model/userModel');

//路由实例化
const router = express.Router();

//解密token的方法
function verifyToken(token) {
  let secret = 'PFUSecret';
  let data = jwt.verify(token, secret);
  return data;
}

//用户查看userSearch
router.post('/userSearch', (req, res) => {
  if (req.body.token) {
    let userData = verifyToken(req.body.token);
    let {
      userId
    } = req.body;
    User.find({
        userName: userData.userName,
        password: userData.password
      })
      .then((data) => {
        if (data.length != 0) {
          if (data[0].userType != 99) {
            res.send({
              err: -3,
              msg: '权限不足',
            });
          } else {
            User.find({
              _id: userId,
            }).then((data) => {
              if (data.length != 0) {
                res.send({
                  err: 0,
                  msg: '用户查找成功',
                  data,
                });
              } else {
                res.send({
                  err: -2,
                  msg: '用户不存在',
                });
              }
            });
          }
        } else {
          res.send({
            err: -4,
            msg: '管理员不存在'
          })
        }
      })
      .catch((err) => {
        res.send({
          err: -99,
          msg: '服务器错误',
        });
      });
  } else {
    res.send({
      err: -1,
      msg: '未登录',
    });
  }
});

//用户删除userDelete
router.post('/userDelete', (req, res) => {
  let {
    userId,
    token
  } = req.body;
  if (token) {
    let userData = verifyToken(req.body.token);
    User.find({
      userName: userData.userName,
      password: userData.password
    }).then((data) => {
      if (data.length != 0) {
        if (data[0].userType != 99) {
          res.send({
            err: -3,
            msg: '权限不足',
          });
        } else {
          User.deleteOne({
              _id: userId,
            })
            .then((_) => {
              res.send({
                err: 0,
                msg: '用户删除成功',
              });
            })
            .catch((err) => {
              res.send({
                err: -99,
                msg: '服务器错误',
              });
            });
        }
      } else {
        res.send({
          err: -2,
          msg: '管理员不存在',
        });
      }
    });
  } else {
    res.send({
      err: -1,
      msg: '未登录',
    });
  }
});

//用户修改userChange
router.post('/userChange', (req, res) => {
  let {
    userId,
    userName,
    password,
    userType,
    userEmail,
    userPhone,
    userScore,
    token,
  } = req.body;
  if (token) {
    let userData = verifyToken(token);
    User.find({
      userName: userData.userName,
      password: userData.password
    }).then((data) => {
      if (data.length != 0) {
        if (data[0].userType != 99) {
          res.send({
            err: -3,
            msg: '权限不足',
          });
        } else {
          User.find({
            _id: userId,
          }).then((data) => {
            if (data.length != 0) {
              let updates = {
                $set: {
                  userName,
                  password,
                  userType,
                  userEmail,
                  userPhone,
                  userScore,
                },
              };
              User.updateOne(data[0], updates)
                .then((_) => {
                  res.send({
                    err: 0,
                    msg: '用户修改成功',
                  });
                })
                .catch((err) => {
                  res.send({
                    err: -99,
                    msg: '服务器错误',
                  });
                });
            } else {
              res.send({
                err: -4,
                msg: '要操作的用户不存在',
              });
            }
          });
        }
      } else {
        res.send({
          err: -2,
          msg: '用户不存在',
        });
      }
    });
  } else {
    res.send({
      err: -1,
      msg: '未登录',
    });
  }
});

//专利查找patentSearch
router.post('/patentSearch', (req, res) => {
  let {
    patentId,
    token
  } = req.body;
  if (token) {
    let userData = verifyToken(token);
    User.find({
        userName: userData.userName,
        password: userData.password
      })
      .then((data) => {
        if (data.length != 0) {
          if (data[0].userType != 99) {
            res.send({
              err: -3,
              msg: '权限不足',
            });
          } else {
            Patent.find({
              _id: patentId,
            }).then((data) => {
              if (data.length != 0) {
                res.send({
                  err: 0,
                  msg: '专利查找成功',
                  data,
                });
              } else {
                res.send({
                  err: -4,
                  msg: '要查找的专利不存在',
                });
              }
            });
          }
        } else {
          res.send({
            err: -2,
            msg: '管理员不存在',
          });
        }
      })
      .catch((err) => {
        res.send({
          err: -99,
          msg: '服务器错误',
        });
      });
  } else {
    res.send({
      err: -1,
      msg: '未登录',
    });
  }
});

//专利状态变更patentStatusChange
router.post('/patentStatusChange', (req, res) => {
  let {
    patentId,
    token
  } = req.body;
  if (token) {
    let userData = verifyToken(token);
    User.find({
        userName: userData.userName,
        password: userData.password
      })
      .then((data) => {
        if (data.length != 0) {
          if (data[0].userType != 99) {
            res.send({
              err: -3,
              msg: '权限不足',
            });
          } else {
            Patent.find({
              _id: patentId,
            }).then((data) => {
              if (data.length != 0) {
                let patentData = data[0];
                if (patentData.patentStatus >= 5) {
                  res.send({
                    err: -4,
                    msg: '该专利已获权，无需修改',
                  });
                } else {
                  let updates = {
                    $set: {
                      patentStatus: patentData.patentStatus + 1,
                    },
                  };
                  Patent.update(patentData, updates).then((_) => {
                    res.send({
                      err: 0,
                      msg: '专利状态修改成功',
                    });
                  });
                }
              } else {
                res.send({
                  err: -4,
                  msg: '要操作的专利不存在',
                });
              }
            });
          }
        } else {
          res.send({
            err: -2,
            msg: '管理员不存在',
          });
        }
      })
      .catch((err) => {
        res.send({
          err: -99,
          msg: '服务器错误',
        });
      });
  } else {
    res.send({
      err: -1,
      msg: '未登录',
    });
  }
});

//专利修改patentChange
router.post('/patentChange', (req, res) => {
  let {
    patentId,
    patentName,
    patentContent,
    patentApplicant,
    patentApplicantLocation,
    patentFile,
    patentType,
    patentArea,
    patentStatus,
    patentApplyDate,
  } = req.body;
  if (token) {
    let userData = verifyToken(token);
    User.find({
        userName: userData.userName,
        password: userData.password
      })
      .then((data) => {
        if (data.length != 0) {
          if (data[0].userType != 99) {
            res.send({
              err: -3,
              msg: '权限不足',
            });
          } else {
            Patent.find({
              patentId,
            }).then((data) => {
              if (data.length != 0) {
                let updates = {
                  $set: {
                    patentName,
                    patentContent,
                    patentApplicant,
                    patentApplicantLocation,
                    patentFile,
                    patentType,
                    patentArea,
                    patentStatus,
                    patentApplyDate,
                  },
                };
                Patent.updateOne(data[0], updates).then((_) => {
                  res.send({
                    err: 0,
                    msg: '专利修改成功',
                  });
                });
              } else {
                res.send({
                  err: -4,
                  msg: '要操作的专利不存在',
                });
              }
            });
          }
        } else {
          res.send({
            err: -2,
            msg: '管理员不存在',
          });
        }
      })
      .catch((err) => {
        res.send({
          err: -99,
          msg: '服务器错误',
        });
      });
  } else {
    res.send({
      err: -1,
      msg: '未登录',
    });
  }
});

//专利删除patentDelete
router.post('/patentDelete', (req, res) => {
  let {
    patentId,
    token
  } = req.body;
  if (token) {
    let userData = verifyToken(token);
    User.find({
        userName: userData.userName,
        password: userData.password
      })
      .then((data) => {
        if (data.length != 0) {
          if (data[0].userType != 99) {
            res.send({
              err: -3,
              msg: '权限不足',
            });
          } else {
            Patent.deleteOne({
              _id: patentId,
            }).then((_) => {
              res.send({
                err: 0,
                msg: '专利删除成功',
              });
            });
          }
        } else {
          res.send({
            err: -2,
            msg: '管理员不存在',
          });
        }
      })
      .catch((err) => {
        res.send({
          err: -99,
          msg: '服务器出错',
        });
      });
  } else {
    res.send({
      err: -1,
      msg: '未登录',
    });
  }
});

//知识增加knowledgeAdd
router.post('/knowledgeAdd', (req, res) => {
  let {
    knowledgeHeadline,
    knowledgeContent,
    knowledgeArea,
    token
  } = req.body;
  if (token) {
    let userData = verifyToken(token);
    User.find({
        userName: userData.userName,
        password: userData.password
      })
      .then((data) => {
        if (data.length != 0) {
          if (data[0].userType != 99) {
            res.send({
              err: -3,
              msg: '权限不足',
            });
          } else {
            Knowledge.insertMany({
              knowledgeHeadline,
              knowledgeContent,
              knowledgeArea,
            }).then((_) => {
              res.send({
                err: 0,
                msg: '知识增加成功',
              });
            });
          }
        } else {
          res.send({
            err: -2,
            msg: '管理员不存在',
          });
        }
      })
      .catch((err) => {
        res.send({
          err: -99,
          msg: '服务器错误',
        });
      });
  } else {
    res.send({
      err: -1,
      msg: '未登录',
    });
  }
});

//知识查找knowledgeSearch
router.post('/knowledgeSearch', (req, res) => {
  let {
    knowledgeId,
    token
  } = req.body;
  if (token) {
    let userData = verifyToken(token);
    User.find({
        userName: userData.userName,
        password: userData.password
      })
      .then((data) => {
        if (data.length != 0) {
          if (data[0].userType != 99) {
            res.send({
              err: -3,
              msg: '权限不足',
            });
          } else {
            Knowledge.find({
              _id: knowledgeId,
            }).then((data) => {
              if (data.length != 0) {
                res.send({
                  err: 0,
                  msg: '知识查找成功',
                  data,
                });
              } else {
                res.send({
                  err: -4,
                  msg: '要操作的知识不存在',
                });
              }
            });
          }
        } else {
          res.send({
            err: -2,
            msg: '管理员不存在',
          });
        }
      })
      .catch((err) => {
        res.send({
          err: -99,
          msg: '服务器错误',
        });
      });
  } else {
    res.send({
      err: -1,
      msg: '未登录',
    });
  }
});

//知识删除knowledgeDelete
router.post('/knowledgeDelete', (req, res) => {
  let {
    knowledgeId,
    token
  } = req.body;
  if (token) {
    let userData = verifyToken(token);
    User.find({
        userName: userData.userName,
        password: userData.password
      })
      .then((data) => {
        if (data.length != 0) {
          if (data[0].userType != 99) {
            res.send({
              err: -3,
              msg: '权限不足',
            });
          } else {
            Knowledge.deleteOne({
                _id: knowledgeId,
              })
              .then((_) => {
                res.send({
                  err: 0,
                  msg: '知识删除成功',
                });
              })
              .catch((err) => {
                res.send({
                  err: -98,
                  msg: '数据库错误',
                });
              });
          }
        } else {
          res.send({
            err: -2,
            msg: '管理员不存在',
          });
        }
      })
      .catch((err) => {
        res.send({
          err: -99,
          msg: '服务器错误',
        });
      });
  } else {
    res.send({
      err: -1,
      msg: '未登录',
    });
  }
});

//知识修改knowledgeChange
router.post('/knowledgeChange', (req, res) => {
  let {
    knowledgeId,
    knowledgeHeadline,
    knowledgeContent,
    knowledgeArea,
    token,
  } = req.body;
  if (token) {
    let userData = verifyToken(token);
    User.find({
        userName: userData.userName,
        password: userData.password
      })
      .then((data) => {
        if (data.length != 0) {
          if (data[0].userType != 99) {
            res.send({
              err: -3,
              msg: '权限不足',
            });
          } else {
            let updates = {
              $set: {
                knowledgeHeadline,
                knowledgeContent,
                knowledgeArea,
              },
            };
            Knowledge.updateOne({
                  _id: knowledgeId,
                },
                updates
              )
              .then((_) => {
                res.send({
                  err: 0,
                  msg: '知识修改成功',
                });
              })
              .catch((err) => {
                res.send({
                  err: -98,
                  msg: '数据库错误',
                });
              });
          }
        } else {
          res.send({
            err: -2,
            msg: '管理员不存在',
          });
        }
      })
      .catch((err) => {
        res.send({
          err: -99,
          msg: '服务器错误',
        });
      });
  } else {
    res.send({
      err: -1,
      msg: '未登录',
    });
  }
});

//新闻添加newsAdd
router.post('/newsAdd', (req, res) => {
  let {
    newsHeadline,
    newsContent,
    newsPicture,
    newsDate,
    newsArea,
    token,
  } = req.body;
  if (token) {
    let userData = verifyToken(token);
    User.find({
        userName: userData.userName,
        password: userData.password
      })
      .then((data) => {
        if (data.length != 0) {
          if (data[0].userType != 99) {
            res.send({
              err: -3,
              msg: '权限不足',
            });
          } else {
            News.insertMany({
                newsHeadline,
                newsContent,
                newsPicture,
                newsDate,
                newsArea,
              })
              .then((_) => {
                res.send({
                  err: 0,
                  msg: '新闻添加成功',
                });
              })
              .catch((err) => {
                res.send({
                  err: -98,
                  msg: '数据库错误',
                });
              });
          }
        } else {
          res.send({
            err: -2,
            msg: '管理员不存在',
          });
        }
      })
      .catch((err) => {
        res.send({
          err: -99,
          msg: '服务器错误',
        });
      });
  } else {
    res.send({
      err: -1,
      msg: '未登录',
    });
  }
});

//新闻查找newsSearch
router.post('/newsSearch', (req, res) => {
  let {
    newsId,
    token
  } = req.body;
  if (token) {
    let userData = verifyToken(token);
    User.find({
      userName: userData.userName,
      password: userData.password
    }).then((data) => {
      if (data.length != 0) {
        if (data[0].userType != 99) {
          res.send({
            err: -3,
            msg: '权限不足',
          });
        } else {
          News.find({
            _id: newsId,
          }).then((data) => {
            if (data.length != 0) {
              res.send({
                err: 0,
                msg: '新闻查找成功',
                data,
              });
            } else {
              res.send({
                err: -4,
                msg: '要操作的新闻不存在',
              });
            }
          });
        }
      } else {
        res.send({
          err: -2,
          msg: '管理员不存在',
        });
      }
    });
  } else {
    res.send({
      err: -1,
      msg: '未登录',
    });
  }
});

//新闻删除newsDelete
router.post('/newsDelete', (req, res) => {
  let {
    newsId,
    token
  } = req.body;
  if (token) {
    let userData = verifyToken(token);
    User.find({
        userName: userData.userName,
        password: userData.password
      })
      .then((data) => {
        if (data.length != 0) {
          if (data[0].userType != 99) {
            res.send({
              err: -3,
              msg: '权限不足',
            });
          } else {
            News.deleteOne({
                _id: newsId,
              })
              .then((_) => {
                res.send({
                  err: 0,
                  msg: '新闻删除成功',
                });
              })
              .catch((err) => {
                res.send({
                  err: -98,
                  msg: '数据库错误',
                });
              });
          }
        } else {
          res.send({
            err: -2,
            msg: '管理员不存在',
          });
        }
      })
      .catch((err) => {
        res.send({
          err: -99,
          msg: '服务器错误',
        });
      });
  } else {
    res.send({
      err: -1,
      msg: '未登录',
    });
  }
});

//新闻修改newsChange
router.post('/newsChange', (req, res) => {
  let {
    newsId,
    newsHeadline,
    newsContent,
    newsPicture,
    newsDate,
    newsArea,
    token,
  } = req.body;
  if (token) {
    let userData = verifyToken(token);
    User.find({
        userName: userData.userName,
        password: userData.password
      })
      .then((data) => {
        if (data.length != 0) {
          if (data[0].userType != 99) {
            res.send({
              err: -3,
              msg: '权限不足',
            });
          } else {
            let updates = {
              $set: {
                newsHeadline,
                newsContent,
                newsPicture,
                newsDate,
                newsArea,
              },
            };
            News.updateOne({
                  _id: newsId,
                },
                updates
              )
              .then((_) => {
                res.send({
                  err: 0,
                  msg: '新闻修改成功',
                });
              })
              .catch((err) => {
                res.send({
                  err: -98,
                  msg: '数据库错误',
                });
              });
          }
        } else {
          res.send({
            err: -2,
            msg: '管理员不存在',
          });
        }
      })
      .catch((err) => {
        res.send({
          err: -99,
          msg: '服务器错误',
        });
      });
  } else {
    res.send({
      err: -1,
      msg: '未登录',
    });
  }
});

//法规增加lawAdd
router.post('/lawAdd', (req, res) => {
  let {
    lawContent,
    lawFrom,
    lawPatentType,
    lawArea,
    token
  } = req.body;
  if (token) {
    let userData = verifyToken(token);
    User.find({
        userName: userData.userName,
        password: userData.password
      })
      .then((data) => {
        if (data.length != 0) {
          if (data[0].userType != 99) {
            res.send({
              err: -3,
              msg: '权限不足',
            });
          } else {
            Law.insertMany({
                lawContent,
                lawFrom,
                lawPatentType,
                lawArea,
              })
              .then((_) => {
                res.send({
                  err: 0,
                  msg: '法规增加成功',
                });
              })
              .catch((err) => {
                res.send({
                  err: -98,
                  msg: '数据库错误',
                });
              });
          }
        } else {
          res.send({
            err: -2,
            msg: '管理员不存在',
          });
        }
      })
      .catch((err) => {
        res.send({
          err: -99,
          msg: '服务器错误',
        });
      });
  } else {
    res.send({
      err: -1,
      msg: '未登录',
    });
  }
});

//法规查找lawSearch
router.post('/lawSearch', (req, res) => {
  let {
    lawId,
    token
  } = req.body;
  if (token) {
    let userData = verifyToken(token);
    User.find({
        userName: userData.userName,
        password: userData.password
      })
      .then((data) => {
        if (data.length != 0) {
          if (data[0].userType != 99) {
            res.send({
              err: -3,
              msg: '权限不足',
            });
          } else {
            Law.find({
                _id: lawId,
              })
              .then((data) => {
                if (data.length != 0) {
                  res.send({
                    err: 0,
                    msg: '法规查找成功',
                    data,
                  });
                } else {
                  res.send({
                    err: -4,
                    msg: '要操作的法规不存在',
                  });
                }
              })
              .catch((err) => {
                res.send({
                  err: -98,
                  msg: '数据库错误',
                });
              });
          }
        } else {
          res.send({
            err: -2,
            msg: '管理员不存在',
          });
        }
      })
      .catch((err) => {
        res.send({
          err: -99,
          msg: '服务器错误',
        });
      });
  } else {
    res.send({
      err: -1,
      msg: '未登录',
    });
  }
});

//法规删除lawDelete
router.post('/lawDelete', (req, res) => {
  let {
    lawId,
    token
  } = req.body;
  if (token) {
    let userData = verifyToken(token);
    User.find({
        userName: userData.userName,
        password: userData.password
      })
      .then((data) => {
        if (data.length != 0) {
          if (data[0].userType != 99) {
            res.send({
              err: -3,
              msg: '权限不足',
            });
          } else {
            Law.deleteOne({
                _id: lawId,
              })
              .then((_) => {
                res.send({
                  err: 0,
                  msg: '法规删除成功',
                });
              })
              .catch((err) => {
                res.send({
                  err: -98,
                  msg: '数据库错误',
                });
              });
          }
        } else {
          res.send({
            err: -2,
            msg: '管理员不存在',
          });
        }
      })
      .catch((err) => {
        res.send({
          err: -99,
          msg: '服务器错误',
        });
      });
  } else {
    res.send({
      err: -1,
      msg: '未登录',
    });
  }
});

//法规修改lawChange
router.post('/lawChange', (req, res) => {
  let {
    lawId,
    lawContent,
    lawFrom,
    lawPatentType,
    lawArea,
    token
  } = req.body;
  if (token) {
    let userData = verifyToken(token);
    User.find({
        userName: userData.userName,
        password: userData.password
      })
      .then((data) => {
        if (data.length != 0) {
          if (data[0].userType != 99) {
            res.send({
              err: -3,
              msg: '权限不足',
            });
          } else {
            let updates = {
              $set: {
                lawContent,
                lawFrom,
                lawPatentType,
                lawArea,
              },
            };
            Law.updateOne({
                  _id: lawId,
                },
                updates
              )
              .then((_) => {
                res.send({
                  err: 0,
                  msg: '法规修改成功',
                });
              })
              .catch((err) => {
                res.send({
                  err: -98,
                  msg: '数据库错误',
                });
              });
          }
        } else {
          res.send({
            err: -2,
            msg: '管理员不存在',
          });
        }
      })
      .catch((err) => {
        res.send({
          err: -99,
          msg: '服务器错误',
        });
      });
  } else {
    res.send({
      err: -1,
      msg: '未登录',
    });
  }
});

//文件查找fileSearch
router.post('/fileSearch', (req, res) => {
  let {
    fileId,
    token
  } = req.body;
  if (token) {
    let userData = verifyToken(token);
    User.find({
      userName: userData.userName,
      password: userData.password
    }).then((data) => {
      if (data.length != 0) {
        if (data[0].userType != 99) {
          res.send({
            err: -3,
            msg: '权限不足',
          });
        } else {
          File.find({
            _id: fileId,
          }).then((data) => {
            if (data) {
              res.send({
                err: 0,
                msg: '文件查找成功',
                data,
              });
            } else {
              res.send({
                err: -98,
                msg: '数据库错误',
              });
            }
          });
        }
      } else {
        res.send({
          err: -2,
          msg: '管理员不存在',
        });
      }
    });
  } else {
    res.send({
      err: -1,
      msg: '未登录',
    });
  }
});

//文件删除fileDelete
router.post('/fileDelete', (req, res) => {
  let {
    fileId,
    token
  } = req.body;
  if (token) {
    let userData = verifyToken(token);
    User.find({
        userName: userData.userName,
        password: userData.password
      })
      .then((data) => {
        if (data.length != 0) {
          if (data[0].userType != 99) {
            res.send({
              err: -3,
              msg: '权限不足',
            });
          } else {
            File.deleteOne({
                _id: fileId,
              })
              .then((_) => {
                res.send({
                  err: 0,
                  msg: '文件删除成功',
                });
              })
              .catch((err) => {
                res.send({
                  err: -98,
                  msg: '数据库错误',
                });
              });
          }
        } else {
          res.send({
            err: -2,
            msg: '管理员不存在',
          });
        }
      })
      .catch((err) => {
        res.send({
          err: -99,
          msg: '服务器错误',
        });
      });
  } else {
    res.send({
      err: -1,
      msg: '未登录',
    });
  }
});

//文件修改fileChange
router.post('/fileChange', (req, res) => {
  let {
    fileId,
    filePath,
    fileName,
    fileOwner,
    filePrice,
    fileArea,
    filePatentType,
    filePurchaseTimes,
    fileDownloadTimes,
    fileInformTimes,
    token,
  } = req.body;
  if (token) {
    let userData = verifyToken(token);
    User.find({
        userName: userData.userName,
        password: userData.password
      })
      .then((data) => {
        if (data.length != 0) {
          if (data[0].userType != 99) {
            res.send({
              err: -3,
              msg: '权限不足',
            });
          } else {
            let updates = {
              $set: {
                filePath,
                fileName,
                fileOwner,
                filePrice,
                fileArea,
                filePatentType,
                filePurchaseTimes,
                fileDownloadTimes,
                fileInformTimes,
              },
            };
            File.updateOne({
                _id: fileId
              }, updates)
              .then((_) => {
                res.send({
                  err: 0,
                  msg: '文件修改成功',
                });
              })
              .catch((err) => {
                res.send({
                  err: -98,
                  msg: '数据库错误',
                });
              });
          }
        } else {
          res.send({
            err: -2,
            msg: '管理员不存在',
          });
        }
      })
      .catch((err) => {
        res.send({
          err: -99,
          msg: '服务器错误',
        });
      });
  } else {
    res.send({
      err: -1,
      msg: '未登录',
    });
  }
});

//路由导出
module.exports = router;
