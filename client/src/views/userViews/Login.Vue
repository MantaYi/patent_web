<template>
  <div class="login-box">
    <h1>登陆</h1>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="用户名" prop="userName">
        <el-input placeholder="请输入用户名" v-model="form.userName" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          placeholder="请输入密码"
          v-model="form.password"
          clearable
          show-password
        ></el-input>
      </el-form-item>
    </el-form>
    <router-link to="/register">还没有账号？快来注册吧！</router-link>
    <el-button @click="login">登陆</el-button>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      form: {
        userName: "",
        password: ""
      },
      rules: {
        userName: [{ required: true, message: "请输入", trigger: "blur" }],
        password: [{ required: true, message: "请输入", trigger: "blur" }]
      }
    };
  },
  methods: {
    login() {
      if (this.form.userName == "") {
        console.log("用户名不能为空");
      } else if (this.form.password == "") {
        console.log("密码不能为空");
      } else {
        this.$http
          .post("localhost:3000/user/login", {
            userName: this.form.userName,
            password: this.form.password
          })
          .then(() => {
            this.$router.push({ path: "" });
          })
          .catch(err => console.log(err));
      }
    }
  }
};
</script>
<style lang="less" scoped>
.login-box {
  width: 1000px;
  height: 500px;
  margin: 150px auto;
  background-color: #fff;
  border-radius: 4px;
  h1 {
    line-height: 150px;
    text-align: center;
  }
  .el-form {
    .el-form-item {
      width: 600px;
      margin: 0 auto;
      margin-bottom: 20px;
    }
  }
  a {
    display: block;
    width: 600px;
    margin: 0 auto;
    padding-left: 80px;
    margin-bottom: 20px;
    color: #003472;
    text-decoration: underline;
  }
  .el-button {
    display: block;
    margin: 0 auto;
  }
}
</style>