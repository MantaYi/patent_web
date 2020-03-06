<template>
  <div class="user">
    <span>用户名称</span>
    <el-button-group>
      <router-link to="/manage/userChange">
        <el-button type="primary" icon="el-icon-edit"></el-button>
      </router-link>
      <a href="javascript:">
        <el-button type="primary" icon="el-icon-delete"></el-button>
      </a>
    </el-button-group>
  </div>
</template>
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