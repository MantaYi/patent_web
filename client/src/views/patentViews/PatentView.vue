<template>
  <div class="patentView">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "Patent"
};
</script>
<style lang="less" scoped>
.patentView {
  width: 1000px;
  min-height: 1000px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>
