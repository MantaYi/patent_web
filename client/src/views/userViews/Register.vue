<template>
  <div class="register-box">
    <el-col>
      <p>注册</p>
    </el-col>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="用户名称" prop="username">
        <el-input v-model="form.username" clearable></el-input>
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
        <el-button type="primary" @click="onSubmit">立即注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "Register",
  data() {
    return {
      form: {
        username: "",
        password: "",
        passwordAg: "",
        userEmail: "",
        userPhone: ""
      },
      rules: {
        username: [{ required: true, message: "请输入", trigger: "blur" }],
        password: [{ required: true, message: "请输入", trigger: "blur" }],
        passwordAg: [{ required: true, message: "请输入", trigger: "blur" }],
        userEmail: [{ required: true, message: "请输入", trigger: "blur" }],
        userPhone: [{ required: true, message: "请输入", trigger: "blur" }]
      }
    };
  }
};
</script>
<style lang="less" scoped>
.register-box {
  width: 1000px;
  height: 700px;
  margin: 0 auto;
  background-color: #fff;
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