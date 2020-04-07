//引入mongoose
const mongoose = require('mongoose');
//定义用户对象
let patentSchema = new mongoose.Schema({
  patentName: {
    type: String,
    required: true,
  },
  patentContent: {
    type: Array,
    required: true,
  },
  patentApplicantId: {
    type: String,
    required: true,
  },
  patentApplicant: {
    type: String,
    required: true,
  },
  patentApplicantLocation: {
    type: String,
    required: true,
  },
  patentFile: {
    type: String,
    required: true,
  },
  patentType: {
    type: Number,
    required: true,
  },
  patentArea: {
    type: String,
    required: true,
  },
  patentStatus: {
    type: Number,
    default: 0,
  },
  patentApplyDate: {
    type: Date,
    default: Date.now
  },
}, {
  versionKey: false,
});
//将schema对象转换为数据模型
//该数据对象和集合关联('集合名',schema对象)
let Patent = mongoose.model('patent', patentSchema);

module.exports = Patent;
