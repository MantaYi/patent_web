<template>
  <div>
    <el-col :span="24">
      <div class="header">
        <img src="../assets/logo.png" alt="patent for you" height="50px" class="left" />
        <p class="left center">
          <router-link to="/">主页</router-link>
          <router-link to="/news">新闻</router-link>
          <router-link to="/knowledge">知识</router-link>
          <router-link to="/law">法律</router-link>
          <router-link to="/file">文件</router-link>
          <router-link to="/patent">专利</router-link>
          <router-link to="/apply">专利申请</router-link>
          <router-link to="/manage">管理</router-link>
        </p>
        <p class="right">
          <router-link to="/login">登录/注册</router-link>
          <router-link to="/space">我的空间</router-link>
        </p>
      </div>
    </el-col>
  </div>
</template>

<script>
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 60px;
  background-color: #003472;
  img {
    margin-top: 5px;
  }
  .left {
    float: left;
    margin-left: 50px;
  }
  .center {
    width: 800px;
  }
  .right {
    float: right;
    width: 200px;
    margin-right: 100px;
  }
  p {
    line-height: 60px;
    display: flex;
    justify-content: space-around;
    a {
      text-align: center;
      display: inline-block;
      margin-right: 20px;
      color: white;
    }
  }
}
</style>