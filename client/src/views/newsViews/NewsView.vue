<template>
  <div class="newsView">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "News"
};
</script>
<style lang="less" scoped>
.newsView {
  width: 1000px;
  min-height: 1000px;
  margin: 0 auto;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>