<template>
  <div class="manageView">
    <el-container>
      <el-aside width="200px">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#003c86"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
        >
          <el-menu-item index="/manage/file">
            <i class="el-icon-folder-opened"></i>
            <span slot="title">文件管理</span>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-reading"></i>
              <span>专利知识</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/manage/knowledge">专利知识管理</el-menu-item>
              <el-menu-item index="/manage/knowledgeAdd">专利知识增加</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-coordinate"></i>
              <span>法律法规</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/manage/law">法律法规管理</el-menu-item>
              <el-menu-item index="/manage/lawAdd">法律法规增加</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-news"></i>
              <span>新闻</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/manage/news">新闻管理</el-menu-item>
              <el-menu-item index="/manage/newsAdd">新闻增加</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="/manage/patent">
            <i class="el-icon-tickets"></i>
            <span slot="title">专利管理</span>
          </el-menu-item>
          <el-menu-item index="/manage/user">
            <i class="el-icon-user"></i>
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
  margin: 20px auto;
  .el-header {
    width: 1200px;
    border-radius: 4px;
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