<template>
  <div>
    <file-component></file-component>
    <el-pagination background layout="prev, pager, next" :total="100"></el-pagination>
  </div>
</template>
<script>
import FileComponent from "../../component/manageComponent/FileComponent";

export default {
  name: "ManageFile",
  components: {
    FileComponent
  }
};
</script>