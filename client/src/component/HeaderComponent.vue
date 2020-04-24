<template>
  <div class="header">
    <img src="../assets/logo.png" alt="patent for you" height="50px" />
    <el-menu
      class="el-menu-demo header-nav"
      mode="horizontal"
      background-color="#003472"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <el-menu-item index="/">主页</el-menu-item>
      <el-menu-item index="/news">新闻</el-menu-item>
      <el-menu-item index="/knowledge">知识</el-menu-item>
      <el-menu-item index="/law">法律</el-menu-item>
      <el-menu-item index="/file">文件</el-menu-item>
      <el-menu-item index="/patent">专利</el-menu-item>
      <el-menu-item index="/manage" id="manage" display="none">管理</el-menu-item>
      <el-menu-item index="/login" id="user">登录/注册</el-menu-item>
      <el-menu-item id="logOut" display="none">退出登录</el-menu-item>
      <el-menu-item index="/space">我的空间</el-menu-item>
    </el-menu>
  </div>
</template>
<script>
setInterval(callback, 5000);
function callback() {
  let userType = localStorage.getItem("userType");
  let userName = localStorage.getItem("userName");
  let logOut = document.querySelector("#logOut");
  let user = document.querySelector("#user");
  let manage = document.querySelector("#manage");
  if (userType) {
    userType = JSON.parse(userType).userType;
    if (userType == 99) {
      manage.style.display = "block";
    } else {
      manage.style.display = "none";
    }
  } else {
    manage.style.display = "none";
  }
  if (userName) {
    userName = JSON.parse(userName).userName;
    user.innerHTML = `${userName}`;
    user.style.pointerEvents = "none";
    logOut.style.display = "block";
    logOut.onclick = function() {
      localStorage.clear();
    };
  } else {
    user.innerHTML = "登录/注册";
    user.style.pointerEvents = "auto";
    logOut.style.display = "none";
  }
}
</script>
<style lang="less" scoped>
.header {
  width: 100%;
  min-width: 1000px;
  height: 60px;
  background-color: #003472;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  img {
    margin-top: 5px;
    margin-left: 100px;
  }
  .header-nav {
    width: 1200px;
    li {
      margin: 0 10px;
      text-align: center;
      &:nth-child(7) {
        margin-right: 100px;
      }
    }
  }
}
</style>
