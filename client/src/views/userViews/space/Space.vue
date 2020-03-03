<template>
  <div class="space">
    <div class="nav">
      <router-link to="/space">
        <i class="el-icon-house"></i>
        <span>主页</span>
      </router-link>
      <router-link to="/space/myPatent">
        <i class="el-icon-tickets"></i>
        <span>专利</span>
      </router-link>
      <router-link to="/space/myFile">
        <i class="el-icon-folder-opened"></i>
        <span>文件</span>
      </router-link>
      <router-link to="/space/infoChange">
        <i class="el-icon-edit"></i>
        <span>信息修改</span>
      </router-link>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "Space"
};
</script>
<style lang="less" scoped>
.space {
  width: 100%;
  height: 1000px;
  background-color: #f4f5f7;

  .nav {
    width: 1000px;
    height: 80px;
    margin: 0 auto;
    background-color: #ffffff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    padding-left: 50px;
    margin-bottom: 20px;
    a {
      display: inline-block;
      width: 100px;
      height: 60px;
      padding-top: 10px;
      line-height: 60px;
    }
  }
}
</style>
