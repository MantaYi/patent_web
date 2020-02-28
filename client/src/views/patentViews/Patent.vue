<template>
  <div class="patentView">
    <patent-component></patent-component>
    <patent-component></patent-component>
    <patent-component></patent-component>
  </div>
</template>
<script>
import PatentComponent from "../../component/PatentComponent";

export default {
  name: "File",
  components: {
    PatentComponent
  }
};
</script>
<style lang="less" scoped>
.patentView {
  width: 1000px;
  height: 1000px;
  background-color: #fff;
  margin: 0 auto;
  padding-top: 20px;
}
</style>