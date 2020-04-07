//引入mongoose
const mongoose = require('mongoose');
//定义用户对象
let fileSchema = new mongoose.Schema({
  filePath: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
  fileOwnerId: {
    type: String,
    required: true,
  },
  fileOwner: {
    type: String,
    required: true,
  },
  filePrice: {
    type: Number,
    required: true,
    default: 1
  },
  fileArea: {
    type: String,
    required: true,
  },
  filePatentType: {
    type: Number,
    required: true,
  },
  filePurchaseTimes: {
    type: Number,
    default: 0
  },
  fileDownloadTimes: {
    type: Number,
    default: 0
  },
  fileInformTimes: {
    type: Number,
    default: 0
  },
}, {
  versionKey: false,
});
//将schema对象转换为数据模型
//该数据对象和集合关联('集合名',schema对象)
let File = mongoose.model('file', fileSchema);

module.exports = File;
