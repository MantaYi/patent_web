<template>
  <div class="myFile">
    <p>购买文件</p>
    <file-component
      v-for="item in userHasFiles"
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
    <p>上传文件</p>
    <file-component
      v-for="item in userUploadFiles"
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
import FileComponent from "../../../component/FileComponent";

export default {
  name: "MyFile",
  components: {
    FileComponent
  },
  data() {
    return {
      userHasFiles: Array,
      userUploadFiles: Array
    };
  },
  created() {
    let url = "http://localhost:3000/user/myFile";
    let token = localStorage.getItem("PFUToken");
    token = JSON.parse(token).token;
    let data = {
      token
    };
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
        this.userHasFiles = PFUFile.userHasFiles;
        this.userUploadFiles = PFUFile.userUploadFiles;
      } else if (PFUFile.err == -1) {
        this.$message({
          message: "用户未登录",
          type: "warning"
        });
      } else if (PFUFile.err == -2) {
        this.$message.error("用户不存在");
      } else {
        this.$message.error("服务器出错，请稍后再试");
      }
    });
  }
};
</script>
<style lang="less" scoped>
.myFile {
  width: 1000px;
  min-height: 1000px;
  clear: both;
  margin: 0 auto;
  margin-top: 20px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>