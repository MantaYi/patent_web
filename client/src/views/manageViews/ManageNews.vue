<template>
  <div>
    <news-component></news-component>
    <el-pagination background layout="prev, pager, next" :total="100"></el-pagination>
  </div>
</template>
<script>
import NewsComponent from "../../component/manageComponent/NewsComponent";

export default {
  name: "ManageNews",
  components: {
    NewsComponent
  }
};
</script>