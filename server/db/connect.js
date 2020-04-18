//引入mongoose
const mongoose = require('mongoose');
//使用mongoose
mongoose.connect('mongodb://localhost/PFU', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
//设置findAndModify
mongoose.set('useFindAndModify', false);
//连接数据库
let db = mongoose.connection; //数据库的连接对象
db.on('error', console.error.bind(console, 'connection error:'))
db.on('open', function () {
  console.log('数据库连接成功')
});
