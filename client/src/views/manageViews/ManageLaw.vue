<template>
  <div>
    <law-component></law-component>
    <el-pagination background layout="prev, pager, next" :total="100"></el-pagination>
  </div>
</template>
<script>
import LawComponent from "../../component/manageComponent/LawComponent";

export default {
  name: "ManageLaw",
  components: {
    LawComponent
  }
};
</script>