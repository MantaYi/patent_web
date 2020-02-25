<template>
  <div class="login-box">
    <div>
      <el-row>
        <el-col :span="24">
          <p>登陆</p>
          <el-input placeholder="请输入用户名" v-model="username" clearable></el-input>
          <el-input type="password" placeholder="请输入密码" v-model="password" clearable></el-input>
        </el-col>
        <el-col>
          <p>
            <router-link to="/register">还没有账号？快来注册吧！</router-link>
          </p>
          <el-button>登陆</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: ""
    };
  }
};
</script>
<style lang="less" scoped>
.login-box {
  width: 1000px;
  height: 1000px;
  margin: 0 auto;
  > div {
    padding-top: 200px;
    .el-row {
      width: 800px;
      height: 600px;
      margin: 0 auto;
      border: 2px solid #003472;
      background-color: #87ceeb;
      border-radius: 10px;
      p {
        height: 100px;
        text-align: center;
        font-size: 50px;
      }
      .el-col {
        &:first-of-type {
          height: 400px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          .el-input {
            width: 500px;
            margin: 0 auto;
          }
        }
        &:last-of-type {
          a {
            font-size: 12px;
            position: relative;
            top: -65px;
            right: -150px;
            color: #000000;
          }
          .el-button {
            display: block;
            width: 100px;
            height: 50px;
            margin: 0 auto;
          }
        }
      }
    }
  }
}
</style>