<template>
  <div class="header">
    <img src="../assets/logo.png" alt="patent for you" height="50px" class="left" />
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo center"
      mode="horizontal"
      @select="handleSelect"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1">
        <router-link to="/">主页</router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <router-link to="/news">新闻</router-link>
      </el-menu-item>
      <el-menu-item index="3">
        <router-link to="/knowledge">知识</router-link>
      </el-menu-item>
      <el-menu-item index="4">
        <router-link to="/law">法律</router-link>
      </el-menu-item>
      <el-menu-item index="5">
        <router-link to="/file">文件</router-link>
      </el-menu-item>
      <el-menu-item index="6">
        <router-link to="/patent">专利</router-link>
      </el-menu-item>
      <el-menu-item index="7">
        <router-link to="/manage">管理</router-link>
      </el-menu-item>
    </el-menu>
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo right"
      mode="horizontal"
      @select="handleSelect"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1">
        <router-link to="/login">登录/注册</router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <router-link to="/space">我的空间</router-link>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<style lang="less" scoped>
.header {
  width: 100%;
  min-width: 1000px;
  height: 60px;
  background-color: #003472;
  display: flex;
  justify-content: space-between;
  img {
    margin-top: 5px;
    margin-left: 100px;
  }
  .el-menu {
    background-color: #003472;
    color: #fff;
  }
  .left {
    float: left;
  }
  .center {
    float: left;
    width: 800px;
    margin-left: 100px;
  }
  .right {
    float: right;
    width: 200px;
    margin-right: 100px;
  }
}
</style>
