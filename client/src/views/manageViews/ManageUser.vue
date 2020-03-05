<template>
  <div>
    <user-component></user-component>
    <el-pagination background layout="prev, pager, next" :total="100"></el-pagination>
  </div>
</template>
<script>
import UserComponent from "../../component/manageComponent/UserComponent";

export default {
  name: "ManageUser",
  components: {
    UserComponent
  }
};
</script>