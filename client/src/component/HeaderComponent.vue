<template>
  <div>
    <el-col :span="24">
      <div class="header">
        <img src="../assets/logo.png" alt="patent for you" height="100px" class="left" />
        <p>
          <router-link to="/consult">Consult</router-link>
        </p>
      </div>
    </el-col>
    <router-view></router-view>
  </div>
</template>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 100px;
  background-color: #003472;
}
.left {
  float: left;
}
</style>