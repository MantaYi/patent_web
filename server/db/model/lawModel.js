//引入mongoose
const mongoose = require('mongoose');
//定义用户对象
let lawSchema = new mongoose.Schema({
  lawContent: {
    type: String,
    required: true,
  },
  lawFrom: {
    type: String,
    required: true,
  },
  lawPatentType: {
    type: String,
    required: true,
  },
  lawArea: {
    type: String,
    required: true,
  }
}, {
  versionKey: false,
});
//将schema对象转换为数据模型
//该数据对象和集合关联('集合名',schema对象)
let Law = mongoose.model('law', lawSchema);

module.exports = Law;
