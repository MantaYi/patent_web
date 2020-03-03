<template>
  <div class="manageView">
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-header>PFU管理系统</el-header>
        <router-view></router-view>
      </el-container>
    </el-container>
  </div>
</template>
<style lang="less" scoped>
.manageView {
  width: 1400px;
  height: 600px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  .el-header {
    background-color: #003472;
    color: rgb(0, 238, 255);
    text-align: center;
    line-height: 60px;
  }
  .el-aside {
    height: 600px;
    background-color: #fff;
  }
}
</style>