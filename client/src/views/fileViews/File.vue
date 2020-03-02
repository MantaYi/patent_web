<template>
  <div>
    <consult-component></consult-component>
    <file-component></file-component>
    <file-component></file-component>
    <file-component></file-component>
    <file-component></file-component>
  </div>
</template>
<script>
import FileComponent from "../../component/FileComponent";
import ConsultComponent from "../../component/consultComponent/ConsultComponent";

export default {
  name: "File",
  components: {
    FileComponent,
    ConsultComponent
  }
};
</script>