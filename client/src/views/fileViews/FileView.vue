<template>
  <div class="fileView">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "File"
};
</script>
<style lang="less" scoped>
.fileView {
  width: 1000px;
  min-height: 1000px;
  background-color: #fff;
  margin: 0 auto;
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>