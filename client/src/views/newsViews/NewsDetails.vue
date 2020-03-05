<template>
  <div>
    <h1>新闻标题</h1>
    <p>新闻内容</p>
    <div class="footer">
      <el-tag>相关领域</el-tag>
      <span>新闻发布时间：2020-03-05</span>
    </div>
  </div>
</template>
<style lang="less" scoped>
h1 {
  text-align: center;
}
p {
  width: 800px;
  min-height: 200px;
  margin: 0 auto;
  text-indent: 2em;
}
.footer {
  width: 800px;
  margin: 0 auto;
  span {
    &:last-of-type {
      float: right;
    }
  }
}
</style>