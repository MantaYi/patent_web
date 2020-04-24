<template>
  <div class="register-box">
    <el-col>
      <p>信息修改</p>
    </el-col>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="用户名称" prop="userName">
        <el-input v-model="form.userName" clearable prop="username"></el-input>
      </el-form-item>
      <el-form-item label="用户密码" prop="password">
        <el-input v-model="form.password" show-password prop="password"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input v-model="form.newPassword" show-password prop="newPassword"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="passwordAg">
        <el-input v-model="form.passwordAg" show-password prop="passwordAg"></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱" prop="userEmail">
        <el-input v-model="form.userEmail" prop="userEmail"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="userPhone">
        <el-input v-model="form.userPhone" prop="userPhone"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="infoChange">立即修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
//引入axios的qs模块
import qs from "qs";

export default {
  name: "Register",
  data() {
    return {
      form: {
        username: "",
        password: "",
        newPassword: "",
        passwordAg: "",
        userEmail: "",
        userPhone: ""
      },
      rules: {
        userName: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" }
        ],
        newPassword: [
          { required: true, message: "新密码不能为空", trigger: "blur" }
        ],
        passwordAg: [
          { required: true, message: "密码验证不能为空", trigger: "blur" }
        ],
        userEmail: [
          { required: true, message: "邮箱不能为空", trigger: "blur" }
        ],
        userPhone: [
          { required: true, message: "电话不能为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    infoChange() {
      if (this.newPassword != this.passwordAg) {
        this.$message({
          message: "两次输入密码不一致",
          type: "warning"
        });
      } else {
        let url = "http://localhost:3000/user/infoChange";
        let token = localStorage.getItem("PFUToken");
        token = JSON.parse(token).token;
        let data = {
          token,
          userName: this.form.userName,
          password: this.form.newPassword,
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
            localStorage.setItem(
              "PFUToken",
              JSON.stringify({ token: PFUChange.token })
            );
          } else if (PFUChange.err == -1) {
            this.$message({
              message: "请先登录",
              type: "warning"
            });
          } else if (PFUChange.err == -2) {
            this.$message.error("用户不存在");
          } else if (PFUChange.err == -3) {
            this.$message({
              message: "用户名已存在",
              type: "warning"
            });
          } else {
            //服务器错误处理
            this.$message.error("服务器出错，请稍后再试");
          }
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
.register-box {
  width: 1000px;
  height: 700px;
  margin: 0 auto;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  .el-col {
    p {
      width: 100%;
      height: 100px;
      line-height: 100px;
      font-size: 50px;
      text-align: center;
    }
  }
  .el-form {
    width: 1000px;
    height: 600px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .el-form-item {
      width: 600px;
      margin: 0 auto;
      .el-button {
        display: block;
        width: 100px;
        height: 40px;
        margin: 0 auto;
      }
    }
  }
}
</style>