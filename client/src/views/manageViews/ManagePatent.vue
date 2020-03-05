<template>
  <div>
    <patent-component></patent-component>
    <el-pagination background layout="prev, pager, next" :total="100"></el-pagination>
  </div>
</template>
<script>
import PatentComponent from "../../component/manageComponent/PatentComponent";

export default {
  name: "ManagePatent",
  components: {
    PatentComponent
  }
};
</script>