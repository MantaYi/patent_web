<template>
  <div>
    <el-col :span="24">
      <div class="header">
        <img src="../assets/logo.png" alt="patent for you" height="50px" class="left" />
        <p class="left">
          <router-link to="/consult">咨询入口</router-link>
        </p>
      </div>
    </el-col>
    <router-view></router-view>
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
    padding: 5px;
  }
  p {
    text-align: center;
    line-height: 60px;
    padding-left: 20px;
    a {
      color: white;
    }
  }
}
.left {
  float: left;
}
</style>