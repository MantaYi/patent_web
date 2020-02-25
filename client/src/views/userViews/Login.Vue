<template>
  <div class="login-box">
    <el-input placeholder="请输入用户名" v-model="username" clearable></el-input>
    <el-input type="password" placeholder="请输入密码" v-model="password" clearable></el-input>
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
  width: 800px;
  height: 600px;
}
</style>