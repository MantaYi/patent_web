//引用express模块
const express = require('express');
//引入body-parser中间件
const bodyParser = require('body-parser');
//引入cors中间件解决跨域问题
const cors = require('cors');
//请求request模块，request模块是对http/https模块的封装
// const request = require('request');
//引入cookieParser中间件
const cookieParser = require('cookie-parser');
//引入用户路由
const userRouter = require('./router/userRouter');
//引入文件路由
const fileRouter = require('./router/fileRouter');
//引入数据库连接
const db = require('./db/connect');

//express实例化
const app = express();
//使用bodyParser，使得能够进行post
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
//使用cors
app.use(cors());
//使用cookieParser
app.use(cookieParser());
//使用用户路由
app.use('/user', userRouter);
//使用文件路由
app.use('/file', fileRouter);

app.listen(3000, () => {
  console.log('server start');
});
