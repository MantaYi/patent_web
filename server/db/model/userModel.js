//引入mongoose
const mongoose = require('mongoose');
//定义用户对象
var userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  userType: {
    type: Number,
    default: 0
  },
  userScore: {
    type: Number,
    default: 0
  },
  userHasFiles: {
    type: Array,
    default: []
  },
  userUploadFiles: {
    type: Array,
    default: []
  },
  userPatent: {
    type: Array,
    default: []
  }
}, {
  versionKey: false
});
//将schema对象转换为数据模型
//该数据对象和集合关联('集合名',schema对象)
var User = mongoose.model('user', userSchema);

module.exports = User;
