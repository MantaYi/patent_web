<template>
  <div class="fileUpload">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="文件上传">
        <el-upload action="http://localhost:3000/file/fileUpload" :on-success="uploadSuccess">
          <el-button size="small" type="primary">点击上传</el-button>
          <div>只能上传文档和图片</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="文件名称" prop="fileName">
        <el-input v-model="form.fileName"></el-input>
      </el-form-item>
      <el-form-item label="文件价格" prop="filePrice">
        <el-input v-model="form.filePrice"></el-input>
      </el-form-item>
      <el-form-item label="专利类型" prop="filePatentType">
        <el-radio-group v-model="form.filePatentType">
          <el-radio-button v-model="form.filePatentType" label="发明专利"></el-radio-button>
          <el-radio-button v-model="form.filePatentType" label="实用新型专利"></el-radio-button>
          <el-radio-button v-model="form.filePatentType" label="外观设计专利"></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="专利领域" prop="fileArea">
        <el-select v-model="form.fileArea" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="upload">上传文件</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
//引入axios的qs模块
import qs from "qs";

export default {
  name: "fileUpload",
  data() {
    return {
      form: {
        fileName: "",
        filePrice: "",
        filePatentType: "",
        fileArea: "",
        filePath: ""
      },
      rules: {
        fileName: [{ required: true, message: "请输入", trigger: "blur" }],
        filePrice: [{ required: true, message: "请输入", trigger: "blur" }],
        filePatentType: [
          { required: true, message: "请输入", trigger: "blur" }
        ],
        fileArea: [{ required: true, message: "请输入", trigger: "blur" }]
      },
      options: [
        {
          value: "人类生活需要",
          label: "人类生活需要"
        },
        {
          value: "作业运输",
          label: "作业运输"
        },
        {
          value: "化学冶金",
          label: "化学冶金"
        },
        {
          value: "纺织造纸",
          label: "纺织造纸"
        },
        {
          value: "固定建筑物",
          label: "固定建筑物"
        },
        {
          value: "机械工程",
          label: "机械工程"
        },
        {
          value: "物理",
          label: "物理"
        },
        {
          value: "电学",
          label: "电学"
        }
      ]
    };
  },
  methods: {
    uploadSuccess(res) {
      this.form.filePath = res.url;
      this.$message({
        message: "文件上传成功",
        type: "success"
      });
    },
    upload() {
      if (
        this.form.fileName &&
        this.form.filePrice &&
        this.form.filePatentType &&
        this.form.fileArea &&
        this.form.filePath
      ) {
        let url = "http://localhost:3000/file/upload";
        let token = localStorage.getItem("PFUToken");
        token = JSON.parse(token).token;
        let data = {
          fileName: this.form.fileName,
          filePrice: this.form.filePrice,
          filePatentType: this.form.filePatentType,
          fileArea: this.form.fileArea,
          filePath: this.form.filePath,
          token
        };
        this.$http({
          method: "post",
          url,
          data: qs.stringify(data)
        }).then(res => {
          let PFUUpload = res.data;
          if (PFUUpload.err == 0) {
            this.$message({
              message: "文件信息添加成功",
              type: "success"
            });
          } else if (PFUApply.err == -1) {
            this.$message({
              message: "用户未登录",
              type: "warning"
            });
          } else if (PFUApply.err == -2) {
            this.$message.error("用户不存在");
          } else {
            this.$message.error("服务器出错，请稍后再试");
          }
        });
      } else {
        this.$message({
          message: "请正确输入相关信息",
          type: "warning"
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
.fileUpload {
  width: 800px;
  min-height: 200px;
  margin: 0 auto;
}
</style>