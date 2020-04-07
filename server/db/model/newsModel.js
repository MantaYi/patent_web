//引入mongoose
const mongoose = require('mongoose');
//定义用户对象
let newsSchema = new mongoose.Schema({
  newsHeadline: {
    type: String,
    required: true,
  },
  newsContent: {
    type: Array,
    required: true,
  },
  newsPicture: {
    type: String,
    required: true,
  },
  newsDate: {
    type: Date,
    default: Date.now
  },
  newsArea: {
    type: String,
    required: true,
  }
}, {
  versionKey: false,
});
//将schema对象转换为数据模型
//该数据对象和集合关联('集合名',schema对象)
let News = mongoose.model('news', newsSchema);

module.exports = News;
