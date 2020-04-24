<template>
  <div class="file">
    <p>
      <i class="el-icon-document"></i>
    </p>
    <div>
      <p>
        <span>文件名称:{{fileName}}</span>
      </p>
      <p>
        <span>专利类型:{{filePatentType}}</span>
        <span>相关领域:{{fileArea}}</span>
      </p>
      <p>
        <span>上传人员:{{fileOwner}}</span>
        <span>文件价格:{{filePrice}}</span>
      </p>
      <p>
        <span>购买次数:{{filePurchaseTimes}}</span>
        <span>下载次数:{{fileDownloadTimes}}</span>
        <span>举报次数:{{fileInformTimes}}</span>
      </p>
    </div>
    <p>
      <el-button type="primary" @click="purchase">购买文件</el-button>
      <el-button type="success" @click="download">下载文件</el-button>
      <el-button type="danger" @click="inform">举报文件</el-button>
    </p>
  </div>
</template>
<script>
//引入axios的qs模块
import qs from "qs";

export default {
  name: "FileComponent",
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
    purchase() {
      let url = "http://localhost:3000/file/purchase";
      let token = localStorage.getItem("PFUToken");
      token = JSON.parse(token).token;
      let data = {
        token,
        fileId: this.fileId,
        filePrice: this.filePrice
      };
      this.$http({
        method: "post",
        url,
        data: qs.stringify(data)
      }).then(res => {
        let PFUPurchase = res.data;
        if (PFUPurchase.err == 0) {
          this.$message({
            message: "文件购买成功",
            type: "success"
          });
        } else if (PFUPurchase.err == 1) {
          this.$message({
            message: "文件已购买",
            type: "success"
          });
        } else if (PFUPurchase.err == -1) {
          this.$message.error("文件不存在");
        } else if (PFUPurchase.err == -2) {
          this.$message.error("用户不存在");
        } else if (PFUPurchase.err == -3) {
          this.$message({
            message: "用户积分不足",
            type: "warning"
          });
        } else if (PFUPurchase.err == -4) {
          this.$message({
            message: "用户未登录",
            type: "warning"
          });
        } else {
          this.$message.error("服务器出错，请稍后再试");
        }
      });
    },
    download() {
      let url = "http://localhost:3000/file/download";
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
        let PFUDownload = res.data;
        if (PFUDownload.err == 0) {
          this.$message({
            message: "文件开始下载",
            type: "success"
          });
          let filePath = PFUDownload.filePath;
          filePath = `../../../server${filePath}`;
          console.log(filePath);
          let a = document.createElement("a");
          a.download = '';
          a.style.display = "none";
          a.href = filePath;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        } else if (PFUDownload.err == -1) {
          this.$message({
            message: "用户未登录",
            type: "warning"
          });
        } else if (PFUDownload.err == -2) {
          this.$message.error("请先购买文件");
        } else if (PFUDownload.err == -3) {
          this.$message.error("用户不存在");
        } else if (PFUDownload.err == -4) {
          this.$message.error("要下载的文件不存在");
        } else {
          this.$message.error("服务器出错，请稍后再试");
        }
      });
    },
    inform() {
      let url = "http://localhost:3000/file/inform";
      let data = {
        fileId: this.fileId
      };
      this.$http({
        method: "post",
        url,
        data: qs.stringify(data)
      }).then(res => {
        let PFUInform = res.data;
        if (PFUInform.err == 0) {
          this.$message({
            message: "文件举报成功",
            type: "success"
          });
        } else if (PFUInform.err == -1) {
          this.$message.error("文件不存在");
        } else {
          this.$message.error("服务器出错，请稍后再试");
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
a {
  color: #000;
}
.file {
  width: 800px;
  height: 200px;
  margin: 0 auto;
  border-radius: 4px;
  border: 2px solid #003472;
  display: flex;
  justify-content: space-around;
  padding-top: 20px;
  margin-bottom: 20px;
  > p {
    i {
      padding-left: 20px;
      padding-right: 20px;
      font-size: 170px;
    }
    &:first-of-type {
      width: 200px;
    }
    &:last-of-type {
      width: 100px;
      padding-right: 20px;
      .el-button {
        margin: 0;
        padding: 0;
        width: 80px;
        height: 40px;
        margin-bottom: 20px;
      }
    }
  }
  > div {
    width: 460px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    p {
      height: 20px;
      margin-bottom: 20px;
      &:nth-child(2) {
        span {
          display: inline-block;
          width: 200px;
        }
      }
      &:nth-child(3) {
        span {
          display: inline-block;
          width: 200px;
        }
      }
      &:last-of-type {
        width: 460px;
        span {
          display: inline-block;
          width: 150px;
        }
      }
    }
  }
}
</style>