<template>
  <div class="patent">
    <span>专利标题</span>
    <span>专利状态</span>
    <el-button-group>
      <router-link to="/manage/patentChange">
        <el-button type="primary" icon="el-icon-edit"></el-button>
      </router-link>
      <a href="javascript:">
        <el-button type="primary" icon="el-icon-delete"></el-button>
      </a>
      <a href="javascript:">
        <el-button type="primary" icon="el-icon-arrow-right"></el-button>
      </a>
    </el-button-group>
  </div>
</template>
<style lang="less" scoped>
.patent {
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