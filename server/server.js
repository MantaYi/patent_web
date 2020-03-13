//引用express模块
const express = require('express')
//引入内置模块path
const path = require('path')
//引入数据库连接
const db = require('./db/connect')
//引入body-parser
const bodyParser = require('body-parser')
//引入文件路由
const fileRouter = require('./router/fileRouter')
//引入cors插件，通过cors解决跨域问题
const cors = require('cors')
//请求request模块，request模块是对http/https模块的封装
const request = require('request')
//引入cookie-parse插件和express-session插件
const cookieParse = require('cookie-parse')
const session = require('express-session')

const app = express()

//使用用户路由
app.use('/user', userRouter)
//session配置
app.use(session({
  secret: 'PFU', //为了安全性的考虑设置secret属性
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7
  }, //设置过期时间
  resave: true, //即使session没有被修改，也保存session值，默认为true
  saveUninitialized: false, //无论有没有session cookie，每次请求都设置session cookie
}))
//使用bodyParser，使得能够进行post
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())
//使用文件路由
app.use('/file', fileRouter)
//使用cors
app.use(cors())
//定义静态资源目录
app.use('/public', express.static(path.join(__dirname, './static')))

app.listen(3000, () => {
  console.log('server start')
})
