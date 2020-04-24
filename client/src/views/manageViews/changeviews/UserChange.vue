<template>
  <div class="userChange">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户名称">
        <el-input v-model="form.userName"></el-input>
      </el-form-item>
      <el-form-item label="用户密码">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱">
        <el-input v-model="form.userEmail"></el-input>
      </el-form-item>
      <el-form-item label="用户电话">
        <el-input v-model="form.userPhone"></el-input>
      </el-form-item>
      <el-form-item label="用户积分">
        <el-input v-model="form.userScore"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="change">修改用户</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
//引入axios的qs模块
import qs from "qs";

export default {
  name: "userChange",
  data() {
    return {
      form: {
        userId: "",
        userName: "",
        password: "",
        userEmail: "",
        userPhone: "",
        userScore: "",
        userType: ""
      }
    };
  },
  created() {
    let data = JSON.parse(localStorage.getItem("userChange"));
    this.form.userId = data.userId;
    this.form.userName = data.userName;
    this.form.password = data.password;
    this.form.userEmail = data.userEmail;
    this.form.userPhone = data.userPhone;
    this.form.userScore = data.userScore;
    this.form.userType = data.userType;
  },
  methods: {
    change() {
      if (
        this.form.userId &&
        this.form.userName &&
        this.form.password &&
        this.form.userEmail &&
        this.form.userPhone
      ) {
        let url = "http://localhost:3000/manage/userChange";
        let token = localStorage.getItem("PFUToken");
        token = JSON.parse(token).token;
        let data = {
          token,
          userId: this.form.userId,
          userName: this.form.userName,
          password: this.form.password,
          userEmail: this.form.userEmail,
          userPhone: this.form.userPhone
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
        console.log(
          this.form.userId,
          this.form.userName,
          this.form.password,
          this.form.userEmail,
          this.form.userPhone,
          this.form.userScore,
          this.form.userType
        );
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
.userChange {
  width: 800px;
  min-height: 200px;
  margin: 0 auto;
}
</style>