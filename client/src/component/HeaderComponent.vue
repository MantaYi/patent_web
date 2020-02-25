<template>
  <div>
    <el-col :span="24">
      <div class="header">
        <img src="../assets/logo.png" alt="patent for you" height="50px" class="left" />
        <p class="left">
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

<style lang="less" scoped>
.header {
  width: 100%;
  height: 60px;
  background-color: #003472;
  img {
    text-align: center;
    vertical-align: middle;
    margin-top: 5px;
    margin-left: 50px;
  }
  .left {
    float: left;
    margin-left: 50px;
  }
  .right {
    float: right;
    margin-right: 100px;
  }
  p {
    text-align: center;
    line-height: 60px;
    padding-left: 20px;
    a {
      display: inline-block;
      width: 100px;

      color: white;
    }
  }
}
</style>