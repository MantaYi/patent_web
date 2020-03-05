<template>
  <div class="file">
    <span>文件名称</span>
    <span>文件购买次数</span>
    <span>文件下载次数</span>
    <span>文件举报次数</span>
    <el-button type="warning" round>文件修改</el-button>
    <el-button type="danger" round>文件删除</el-button>
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