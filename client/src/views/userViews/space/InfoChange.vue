<template>
  <div class="register-box">
    <el-col>
      <p>信息修改</p>
    </el-col>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="用户名称">
        <el-input v-model="form.username" clearable prop="username"></el-input>
      </el-form-item>
      <el-form-item label="用户密码">
        <el-input v-model="form.password" show-password prop="password"></el-input>
      </el-form-item>
      <el-form-item label="新密码">
        <el-input v-model="form.newPassword" show-password prop="newPassword"></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input v-model="form.passwordAg" show-password prop="passwordAg"></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱">
        <el-input v-model="form.userEmail" prop="userEmail"></el-input>
      </el-form-item>
      <el-form-item label="手机号码">
        <el-input v-model="form.userPhone" prop="userPhone"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即修改</el-button>
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
        newPassword: "",
        passwordAg: "",
        userEmail: "",
        userPhone: ""
      },
      rules: {
        username: [{ required: true, message: "请输入", trigger: "blur" }],
        password: [{ required: true, message: "请输入", trigger: "blur" }],
        newPassword: [{ required: true, message: "请输入", trigger: "blur" }],
        passwordAg: [{ required: true, message: "请输入", trigger: "blur" }],
        userEmail: [{ required: true, message: "请输入", trigger: "blur" }],
        userPhone: [{ required: true, message: "请输入", trigger: "blur" }]
      }
    };
  },
  methods: {
    onSubmit() {}
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