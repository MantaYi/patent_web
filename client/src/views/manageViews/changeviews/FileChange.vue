<template>
  <div class="fileChange">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="文件名称">
        <el-input v-model="form.fileName"></el-input>
      </el-form-item>
      <el-form-item label="文件价格">
        <el-input v-model="form.filePrice"></el-input>
      </el-form-item>
      <el-form-item label="专利类型">
        <el-radio-group v-model="form.filePatentType">
          <el-radio-button v-model="form.filePatentType" label="发明专利"></el-radio-button>
          <el-radio-button v-model="form.filePatentType" label="实用新型专利"></el-radio-button>
          <el-radio-button v-model="form.filePatentType" label="外观设计专利"></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="专利领域">
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
        <el-button type="primary" @click="change">修改文件</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
//引入axios的qs模块
import qs from "qs";

export default {
  name: "fileChange",
  data() {
    return {
      form: {
        fileId: "",
        fileName: "",
        filePath: "",
        fileOwner: "",
        filePrice: 0,
        fileArea: "",
        filePatentType: "",
        filePurchaseTimes: 0,
        fileDownloadTimes: 0,
        fileInformTimes: 0
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
  created() {
    let data = JSON.parse(localStorage.getItem("fileChange"));
    this.form.fileId = data.fileId;
    this.form.fileName = data.fileName;
    this.form.filePath = data.filePath;
    this.form.fileOwner = data.fileOwner;
    this.form.filePrice = data.filePrice;
    this.form.fileArea = data.fileArea;
    this.form.filePatentType = data.filePatentType;
    this.form.filePurchaseTimes = data.filePurchaseTimes;
    this.form.fileDownloadTimes = data.fileDownloadTimes;
    this.form.fileInformTimes = data.fileInformTimes;
  },
  methods: {
    change() {
      if (
        this.form.fileId &&
        this.form.fileName &&
        this.form.filePath &&
        this.form.fileOwner &&
        this.form.filePrice &&
        this.form.fileArea &&
        this.form.filePatentType
      ) {
        let url = "http://localhost:3000/manage/fileChange";
        let token = localStorage.getItem("PFUToken");
        token = JSON.parse(token).token;
        let data = {
          token,
          fileId: this.form.fileId,
          fileName: this.form.fileName,
          filePath: this.form.filePath,
          fileOwner: this.form.fileOwner,
          filePrice: this.form.filePrice,
          fileArea: this.form.fileArea,
          filePatentType: this.form.filePatentType,
          filePurchaseTimes: this.form.filePurchaseTimes,
          fileDownloadTimes: this.form.fileDownloadTimes,
          fileInformTimes: this.form.fileInformTimes
        };
        this.$http({
          method: "post",
          url,
          data: qs.stringify(data)
        }).then(res => {
          let PFUChange = res.data;
          if (PFUChange.err == 0) {
            this.$message({
              message: "修改成功",
              type: "success"
            });
          } else if (PFUChange.err == -1) {
            this.$message({
              message: "请先登录",
              type: "warning"
            });
          } else if (PFUChange.err == -2) {
            this.$message.error("用户不存在");
          } else if (PFUChange.err == -3) {
            this.$message.error("用户权限不足");
          } else {
            //服务器错误处理
            this.$message.error("服务器出错，请稍后再试");
          }
        });
      } else {
        this.$message({
          message: "请正确修改相关信息",
          type: "warning"
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
.fileChange {
  width: 800px;
  min-height: 200px;
  margin: 0 auto;
}
</style>