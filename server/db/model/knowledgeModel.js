//引入mongoose
const mongoose = require('mongoose');
//定义用户对象
let knowledgeSchema = new mongoose.Schema({
  knowledgeHeadline: {
    type: String,
    required: true,
  },
  knowledgeContent: {
    type: String,
    required: true,
  },
  knowledgeArea: {
    type: String,
    required: true,
  },
}, {
  versionKey: false,
});
//将schema对象转换为数据模型
//该数据对象和集合关联('集合名',schema对象)
const Knowledge = mongoose.model('knowledge', knowledgeSchema);

module.exports = Knowledge;
