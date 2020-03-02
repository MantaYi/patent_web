<template>
  <div>
    <consult-component></consult-component>
    <knowledge-component></knowledge-component>
    <knowledge-component></knowledge-component>
    <knowledge-component></knowledge-component>
    <knowledge-component></knowledge-component>
  </div>
</template>
<script>
import KnowledgeComponent from "../../component/KnowledgeComponent";
import ConsultComponent from "../../component/consultComponent/ConsultComponent";

export default {
  name: "Knowledge",
  components: {
    KnowledgeComponent,
    ConsultComponent
  }
};
</script>