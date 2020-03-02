<template>
  <div>
    <consult-component></consult-component>
    <law-component></law-component>
    <law-component></law-component>
    <law-component></law-component>
    <law-component></law-component>
  </div>
</template>
<script>
import LawComponent from "../../component/LawComponent";
import ConsultComponent from "../../component/consultComponent/ConsultComponent";

export default {
  name: "Law",
  components: {
    LawComponent,
    ConsultComponent
  }
};
</script>