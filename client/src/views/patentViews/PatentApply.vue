<template>
  <div class="apply">
    <p>专利申请</p>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="专利名称" prop="patentName">
        <el-input v-model="form.patentName" clearable></el-input>
      </el-form-item>
      <el-form-item label="专利描述" prop="patentContent">
        <el-input type="textarea" v-model="form.patentContent" :rows="5" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="patentApplicationLocation">
        <el-input v-model="form.patentApplicantLocation" clearable></el-input>
      </el-form-item>
      <el-form-item label="专利类型" prop="patentType">
        <el-radio-group v-model="form.patentType">
          <el-radio-button v-model="form.patentType" label="发明专利"></el-radio-button>
          <el-radio-button v-model="form.patentType" label="实用新型专利"></el-radio-button>
          <el-radio-button v-model="form.patentType" label="外观设计专利"></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="专利领域" prop="patentArea">
        <el-select v-model="form.patentArea" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文件上传">
        <el-upload action="http://localhost:3000/file/fileUpload" :on-success="uploadSuccess">
          <el-button size="small" type="primary">点击上传</el-button>
          <div>只能上传文档和图片</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="apply">立即申请</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
//引入axios的qs模块
import qs from "qs";

export default {
  name: "PatentApply",
  data() {
    return {
      form: {
        patentName: "",
        patentContent: "",
        patentApplicantLocation: "",
        patentFile: "",
        patentType: "",
        patentArea: ""
      },
      rules: {
        patentName: [{ required: true, message: "请输入", trigger: "blur" }],
        patentContent: [{ required: true, message: "请输入", trigger: "blur" }],
        patentApplicationLocation: [
          { required: true, message: "请输入", trigger: "blur" }
        ],
        patentType: [{ required: true, message: "请输入", trigger: "blur" }],
        patentArea: [{ required: true, message: "请输入", trigger: "blur" }]
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
      this.form.patentFile = res.url;
      this.$message({
        message: "文件上传成功",
        type: "success"
      });
    },
    apply() {
      if (
        this.form.patentName &&
        this.form.patentContent &&
        this.form.patentApplicantLocation &&
        this.form.patentFile &&
        this.form.patentType &&
        this.form.patentArea
      ) {
        let url = "http://localhost:3000/patent/apply";
        let token = localStorage.getItem("PFUToken");
        token = JSON.parse(token).token;
        let data = {
          patentName: this.form.patentName,
          patentContent: this.form.patentContent,
          patentApplicantLocation: this.form.patentApplicantLocation,
          patentFile: this.form.patentFile,
          patentType: this.form.patentType,
          patentArea: this.form.patentArea,
          token
        };
        this.$http({
          method: "post",
          url,
          data: qs.stringify(data)
        }).then(res => {
          let PFUApply = res.data;
          if (PFUApply.err == 0) {
            this.$message({
              message: "专利已受理",
              type: "success"
            });
          } else if (PFUApply.err == -1) {
            this.$message({
              message: "用户未登录",
              type: "warning"
            });
          } else if (PFUApply.err == -2) {
            this.$message.error("用户不存在");
          } else if (PFUApply.err == -3) {
            this.$message.error("专利添加失败");
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
.apply {
  width: 1000px;
  min-height: 1000px;
  margin: 0 auto;
  p {
    height: 100px;
    font-size: 60px;
    line-height: 100px;
    text-align: center;
  }
  .el-form {
    width: 700px;
    height: 700px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .el-form-item {
      width: 700px;
      margin-bottom: 20px;
      &:last-of-type {
        text-align: center;
        .el-button {
          width: 100px;
          height: 40px;
        }
      }
    }
    .el-upload {
      width: 200px;
      height: 100px;
      margin: 0 auto;
    }
  }
}
</style>