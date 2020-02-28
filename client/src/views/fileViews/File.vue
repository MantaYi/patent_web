<template>
  <div class="fileView">
    <file-component></file-component>
    <file-component></file-component>
    <file-component></file-component>
    <file-component></file-component>
  </div>
</template>
<script>
import FileComponent from "../../component/FileComponent"

export default {
  name: "File",
  components: {
    FileComponent
  }
}
</script>
<style lang="less" scoped>
  .fileView{
    width: 1000px;
    height: 1000px;
    background-color: #fff;
    margin: 0 auto;
    padding-top: 20px;
  }
</style>