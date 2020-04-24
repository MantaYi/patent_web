<template>
  <div>
    <el-input v-model="id" placeholder="请输入文件Id"></el-input>
    <i class="el-icon-search" @click="getFileById"></i>
    <file-component
      v-for="item in fileList"
      :key="item._id"
      :fileId="item._id"
      :fileName="item.fileName"
      :filePath="item.filePath"
      :fileOwner="item.fileOwner"
      :filePrice="item.filePrice"
      :fileArea="item.fileArea"
      :filePatentType="item.filePatentType"
      :filePurchaseTimes="item.filePurchaseTimes"
      :fileDownloadTimes="item.fileDownloadTimes"
      :fileInformTimes="item.fileInformTimes"
    ></file-component>
  </div>
</template>
<script>
//引入axios的qs模块
import qs from "qs";

import FileComponent from "../../component/manageComponent/FileComponent";

export default {
  name: "ManageFile",
  components: {
    FileComponent
  },
  data() {
    return {
      id: "",
      fileList: []
    };
  },
  methods: {
    getFileById() {
      if (this.id) {
        let fileId = this.id;
        let token = localStorage.getItem("PFUToken");
        token = JSON.parse(token).token;
        let data = {
          fileId,
          token
        };
        let url = "http://localhost:3000/manage/fileSearch";
        this.$http({
          method: "post",
          url,
          data: qs.stringify(data)
        }).then(res => {
          let PFUFile = res.data;
          if (PFUFile.err == 0) {
            this.$message({
              message: "查找文件成功",
              type: "success"
            });
            this.fileList = PFUFile.data;
            localStorage.setItem(
              "manageFile",
              JSON.stringify({
                fileId: this.fileList[0]._id
              })
            );
          } else if (PFUFile.err == -1) {
            this.$message({
              message: "用户未登录",
              type: "warning"
            });
          } else if (PFUFile.err == -2) {
            this.$message.error("用户不存在");
          } else if (PFUFile.err == -3) {
            this.$message.error("用户权限不足");
          } else if (PFUFile.err == -4) {
            this.$message.error("文件不存在");
          } else {
            this.$message.error("服务器出错，请稍后再试");
          }
        });
      } else {
        this.$message({
          message: "Id不能为空",
          type: "warning"
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
.el-input {
  margin-left: 20px;
  display: inline-block;
  width: 200px;
}
.el-icon-search {
  width: 60px;
  height: 40px;
  background-color: #003472;
  color: #fff;
  text-align: center;
  line-height: 40px;
  border-radius: 6px;
  cursor: pointer;
}
</style>