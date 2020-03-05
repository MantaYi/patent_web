<template>
  <div class="file">
    <span>专利标题</span>
    <span>专利状态</span>
    <el-button type="success" round>进入下一阶段</el-button>
    <el-button type="warning" round>专利修改</el-button>
    <el-button type="danger" round>专利删除</el-button>
  </div>
</template>
<style lang="less" scoped>
.file {
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
  .el-button {
    float: right;
    margin: 0 10px;
  }
}
</style>