<template>
  <div class="file">
    <span>法律法规标题</span>
    <el-button type="warning" round>法规修改</el-button>
    <el-button type="danger" round>法规删除</el-button>
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