<template>
  <div class="user">
    <span>用户名称:{{userName}}</span>
    <el-button-group>
      <router-link to="/manage/userChange">
        <el-button type="primary" icon="el-icon-edit" @click="change"></el-button>
      </router-link>
      <a href="javascript:">
        <el-button type="primary" icon="el-icon-delete" @click="userDelete"></el-button>
      </a>
    </el-button-group>
  </div>
</template>
<script>
//引入axios的qs模块
import qs from "qs";

export default {
  name: "ManageUserComponent",
  props: {
    userId: String,
    userName: String,
    password: String,
    userEmail: String,
    userPhone: String,
    userType: String,
    userScore: String
  },
  methods: {
    change() {
      let data = {
        userId: this.userId,
        userName: this.userName,
        password: this.password,
        userEmail: this.userEmail,
        userPhone: this.userPhone,
        userType: this.userType,
        userScore: this.userScore
      };
      localStorage.setItem("userChange", JSON.stringify(data));
      this.$router.push({ name: "UserChange" });
    },
    userDelete() {
      let url = "http://localhost:3000/manage/userDelete";
      let token = localStorage.getItem("PFUToken");
      token = JSON.parse(token).token;
      let data = {
        token,
        userId: this.userId
      };
      this.$http({
        method: "post",
        url,
        data: qs.stringify(data)
      }).then(res => {
        let PFUUser = res.data;
        if (PFUUser.err == 0) {
          this.$message({
            message: "用户删除成功",
            type: "success"
          });
        } else if (PFUUser.err == -1) {
          this.$message({
            message: "用户未登录",
            type: "warning"
          });
        } else if (PFUUser.err == -2) {
          this.$message.error("用户不存在");
        } else if (PFUUser.err == -3) {
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
.user {
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