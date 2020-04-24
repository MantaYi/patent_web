<template>
  <div class="file">
    <span>文件Id:{{fileId}}</span>
    <span>文件购买次数:{{filePurchaseTimes}}</span>
    <span>文件下载次数:{{fileDownloadTimes}}</span>
    <span>文件举报次数:{{fileInformTimes}}</span>
    <el-button-group>
      <a>
        <el-button type="primary" icon="el-icon-edit" @click="change"></el-button>
      </a>
      <a href="javascript:">
        <el-button type="primary" icon="el-icon-delete" @click="fileDelete"></el-button>
      </a>
    </el-button-group>
  </div>
</template>
<script>
//引入axios的qs模块
import qs from "qs";

export default {
  name: "ManageFileComponent",
  props: {
    fileId: String,
    fileName: String,
    filePath: String,
    fileOwner: String,
    filePrice: Number,
    fileArea: String,
    filePatentType: String,
    filePurchaseTimes: Number,
    fileDownloadTimes: Number,
    fileInformTimes: Number
  },
  methods: {
    change() {
      let data = {
        fileId: this.fileId,
        fileName: this.fileName,
        filePath: this.filePath,
        fileOwner: this.fileOwner,
        filePrice: this.filePrice,
        fileArea: this.fileArea,
        filePatentType: this.filePatentType,
        filePurchaseTimes: this.filePurchaseTimes,
        fileDownloadTimes: this.fileDownloadTimes,
        fileInformTimes: this.fileInformTimes
      };
      localStorage.setItem("fileChange", JSON.stringify(data));
      this.$router.push({ name: "FileChange" });
    },
    fileDelete() {
      let url = "http://localhost:3000/manage/fileDelete";
      let token = localStorage.getItem("PFUToken");
      token = JSON.parse(token).token;
      let data = {
        token,
        fileId: this.fileId
      };
      this.$http({
        method: "post",
        url,
        data: qs.stringify(data)
      }).then(res => {
        let PFUFile = res.data;
        if (PFUFile.err == 0) {
          this.$message({
            message: "文件删除成功",
            type: "success"
          });
        } else if (PFUFile.err == -1) {
          this.$message({
            message: "用户未登录",
            type: "warning"
          });
        } else if (PFUFile.err == -2) {
          this.$message.error("用户不存在");
        } else if (PFUFile.err == -3) {
          this.$message.error("用户权限不足");
        } else {
          this.$message.error("服务器出错，请稍后再试");
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.file {
  width: 1000px;
  height: 50px;
  padding: 5px 50px 0px 50px;
  margin: 0 auto;
  border: 2px solid #003472;
  border-radius: 4px;
  margin-bottom: 20px;
  span {
    line-height: 40px;
    margin: 0 10px;
  }
  .el-button-group {
    float: right;
  }
}
</style>