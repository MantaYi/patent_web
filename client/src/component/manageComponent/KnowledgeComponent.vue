<template>
  <div class="knowledge">
    <span>专利知识标题</span>
    <el-button-group>
      <router-link to="/manage/knowledgeChange">
        <el-button type="primary" icon="el-icon-edit"></el-button>
      </router-link>
      <el-button type="primary" icon="el-icon-delete"></el-button>
    </el-button-group>
  </div>
</template>
<style lang="less" scoped>
.knowledge {
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