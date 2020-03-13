//引入mongoose
const mongoose = require('mongoose')
//使用mongoose
mongoose.connect('mongodb://localhost/1902', {
  useNewUrlParser: true
})
//连接数据库
var db = mongoose.connection //数据库的连接对象
db.on('error', console.error.bind(console, 'connection error:'))
db.on('open', function () {
  console.log('数据库连接成功')
})
