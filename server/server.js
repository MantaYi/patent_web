//引用express模块
const express = require('express');
//引入body-parser组件
const bodyParser = require('body-parser');
//引入cors插件解决跨域问题
const cors = require('cors');
//请求request模块，request模块是对http/https模块的封装
const request = require('request');
//引入express-session插件
const session = require('express-session');
//引入用户路由
const userRouter = require('./router/userRouter');
//引入文件路由
const fileRouter = require('./router/fileRouter');
//引入数据库连接
const db = require('./db/connect');

//express实例化
const app = express();
//使用bodyParser，使得能够进行post
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
//使用cors
app.use(cors());
//session配置
app.use(session({
  secret: 'secretForPFU', //安全性考虑设置secret
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7
  }, //设置过期时间为7天
  resave: true, //及时session没有修改，也保存session值，默认为true
  saveUninitialized: false //无论有没有session cookie，每次请求都设置session cookie
}))
//使用用户路由
app.use('/user', userRouter)
//使用文件路由
app.use('/file', fileRouter);

app.listen(3000, () => {
  console.log("server start");
});
