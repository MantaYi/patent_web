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
        <el-button type="primary">修改用户</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "userChange",
  data() {
    return {
      form: {
        userName: "",
        password: "",
        userEmail: "",
        userPhone: "",
        userScore: ""
      },
      options: [
        {
          value: "A",
          label: "人类生活需要"
        },
        {
          value: "B",
          label: "作业运输"
        },
        {
          value: "C",
          label: "化学冶金"
        },
        {
          value: "D",
          label: "纺织造纸"
        },
        {
          value: "E",
          label: "固定建筑物"
        },
        {
          value: "F",
          label: "机械工程"
        },
        {
          value: "G",
          label: "物理"
        },
        {
          value: "H",
          label: "电学"
        }
      ]
    };
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