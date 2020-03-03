<template>
  <div class="myFile">
    <file-component></file-component>
  </div>
</template>
<script>
import FileComponent from "../../../component/FileComponent";

export default {
  name: "MyFile",
  components: {
    FileComponent
  }
};
</script>
<style lang="less" scoped>
.myFile {
  width: 1000px;
  height: 500px;
  margin: 0 auto;
  margin-top: 20px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding-top: 20px;
}
</style>