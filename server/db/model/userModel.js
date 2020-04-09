//引入mongoose
const mongoose = require('mongoose');
//定义用户对象
let userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true
  },
  userPhone: {
    type: String,
    required: true
  },
  identify: {
    type: Object,
    default: {
      code: '',
      time: 0
    }
  },
  userType: {
    type: Number,
    default: 0,
  },
  userScore: {
    type: Number,
    default: 0,
  },
  userHasFiles: {
    type: Array,
    default: [],
  },
  userUploadFiles: {
    type: Array,
    default: [],
  },
  userPatent: {
    type: Array,
    default: [],
  },
}, {
  versionKey: false,
});
//将schema对象转换为数据模型
//该数据对象和集合关联('集合名',schema对象)
let User = mongoose.model('user', userSchema);

module.exports = User;
