<template>
  <div class="manageView">
    <el-container>
      <el-aside width="200px">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="1">
            <i class="el-icon-menu"></i>
            <span slot="title">文件管理</span>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>专利知识</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1">专利知识管理</el-menu-item>
              <el-menu-item index="2-2">专利知识增加</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>法律法规</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1">法律法规管理</el-menu-item>
              <el-menu-item index="3-2">法律法规增加</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>新闻</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="4-1">新闻管理</el-menu-item>
              <el-menu-item index="4-2">新闻增加</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="5">
            <i class="el-icon-menu"></i>
            <span slot="title">专利管理</span>
          </el-menu-item>
          <el-menu-item index="6">
            <i class="el-icon-menu"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
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
    background-color: #003c86;
    color: rgb(0, 238, 255);
    text-align: center;
    line-height: 60px;
  }
  .el-aside {
    height: 600px;
    background-color: #fff;
    .el-menu {
      height: 600px;
    }
  }
}
</style>