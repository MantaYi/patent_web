<template>
  <div class="register-box">
    <el-col>
      <p>注册</p>
    </el-col>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="用户名称" prop="userName">
        <el-input v-model="form.userName" clearable></el-input>
      </el-form-item>
      <el-form-item label="用户密码" prop="password">
        <el-input v-model="form.password" clearable show-password></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="passwordAg">
        <el-input v-model="form.passwordAg" clearable show-password></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱" prop="userEmail">
        <el-input v-model="form.userEmail"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="userPhone">
        <el-input v-model="form.userPhone"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="register">立即注册</el-button>
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
        userName: "",
        password: "",
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
        passwordAg: [
          { required: true, message: "密码确认不能为空", trigger: "blur" }
        ],
        userEmail: [
          { required: true, message: "邮箱不能为空", trigger: "blur" }
        ],
        userPhone: [
          { required: true, message: "电话号码不能为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    register() {
      if (this.form.password != this.form.passwordAg) {
        this.$message.error("两次输入的密码不一致");
      } else if (
        this.form.userName &&
        this.form.password &&
        this.form.passwordAg &&
        this.userEmail &&
        this.userPhone
      ) {
        let url = "http://localhost:3000/user/register";
        let data = {
          userName: this.form.userName,
          password: this.form.password,
          userEmail: this.form.userEmail,
          userPhone: this.form.userPhone
        };
        this.$http({
          method: "post",
          url,
          data: qs.stringify(data)
        })
          .then(res => {
            let PFUReg = res.data;
            if (PFUReg.err == 0) {
              //注册成功的处理
              localStorage.setItem(
                "PFUToken",
                JSON.stringify({ token: PFUReg.token })
              );
              localStorage.setItem("userType", JSON.stringify({ userType: 0 }));
              localStorage.setItem(
                "userName",
                JSON.stringify({ userName: this.form.userName })
              );
              this.$router.push({ name: "/" });
            } else if (PFUReg.err == -1) {
              //数据错误处理
              this.$message.error("数据传输出错");
            } else if (PFUReg.err == -2) {
              //用户已注册处理
              this.$message({
                message: "该用户名已存在，请更改用户名或者直接登录",
                type: "warning"
              });
            } else {
              //服务器错误处理
              this.$message.error("服务器出错，请稍后再试");
            }
          })
          .catch(err => {
            //请求失败处理
            this.$message({
              message: "请求失败，请稍后再试",
              type: "warning"
            });
            console.log(err);
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