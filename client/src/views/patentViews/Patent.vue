<template>
  <div>
    <consult-component></consult-component>
    <patent-component></patent-component>
    <patent-component></patent-component>
    <patent-component></patent-component>
  </div>
</template>
<script>
import PatentComponent from "../../component/PatentComponent";
import ConsultComponent from "../../component/consultComponent/ConsultComponent";

export default {
  name: "Patent",
  components: {
    PatentComponent,
    ConsultComponent
  }
};
</script>