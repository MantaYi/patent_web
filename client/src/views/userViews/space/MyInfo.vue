<template>
  <div class="myInfo">
    <p>用户名称：{{userName}}</p>
    <p>用户邮箱：{{userEmail}}</p>
    <p>手机号码：{{userPhone}}</p>
    <p>用户积分：{{userScore}}</p>
    <p>拥有专利数量：{{userPatentNumber}}</p>
    <p>上传文件数量：{{userUploadFilesNumber}}</p>
    <p>购买文件数量：{{userHasFilesNumber}}</p>
  </div>
</template>
<script>
//引入axios的qs模块
import qs from "qs";

export default {
  name: "MyInfo",
  data() {
    return {
      userName: "",
      userEmail: "",
      userPhone: "",
      userScore: 0,
      userPatent: [],
      userUploadFiles: [],
      userHasFiles: []
    };
  },
  computed: {
    userPatentNumber() {
      return this.userPatent.length;
    },
    userUploadFilesNumber() {
      return this.userUploadFiles.length;
    },
    userHasFilesNumber() {
      return this.userHasFiles.length;
    }
  },
  created() {
    let url = "http://localhost:3000/user/myInfo";
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
      let PFUInfo = res.data;
      if (PFUInfo.err == 0) {
        let userData = PFUInfo.data;
        this.userName = userData.userName;
        this.userEmail = userData.userEmail;
        this.userPhone = userData.userPhone;
        this.userScore = userData.userScore;
        this.userPatent = userData.userPatent;
        this.userUploadFiles = userData.userUploadFiles;
        this.userHasFiles = userData.userHasFiles;
      } else if (PFUInfo.err == -1) {
        this.$message({
          message: "请先登录",
          type: "warning"
        });
      } else if (PFUInfo.err == -2) {
        this.$message.error("用户不存在");
      } else {
        //服务器错误处理
        this.$message.error("服务器出错，请稍后再试");
      }
    });
  }
};
</script>
<style lang="less" scoped>
.myInfo {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 1000px;
  margin: 0 auto;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding-top: 40px;
  p {
    width: 500px;
    height: 100px;
    margin: 0 auto;
    font-size: 30px;
    text-align: left;
  }
}
</style>
