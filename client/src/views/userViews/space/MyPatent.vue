<template>
  <div class="myPatent">
    <patent-component></patent-component>
  </div>
</template>
<script>
import PatentComponent from "../../../component/PatentComponent"

export default {
  name: "MyPatent",
  components: {
    PatentComponent
  }
};
</script>
<style lang="less" scoped>
.myPatent {
  width: 1000px;
  height: 500px;
  margin: 0 auto;
  margin-top: 20px;
  background-color: #fff;
  border-radius: 4px;
  padding-top: 20px;
}
</style>