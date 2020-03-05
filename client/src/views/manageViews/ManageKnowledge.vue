<template>
  <div>
    <knowledge-component></knowledge-component>
    <el-pagination background layout="prev, pager, next" :total="100"></el-pagination>
  </div>
</template>
<script>
import KnowledgeComponent from "../../component/manageComponent/KnowledgeComponent";

export default {
  name: "ManageKnowledge",
  components: {
    KnowledgeComponent
  }
};
</script>