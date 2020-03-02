<template>
  <div>
    <consult-component></consult-component>
    <news-component></news-component>
    <news-component></news-component>
    <news-component></news-component>
    <news-component></news-component>
    <news-component></news-component>
  </div>
</template>
<script>
import NewsComponent from "../../component/NewsComponent";
import ConsultComponent from "../../component/consultComponent/ConsultComponent";

export default {
  name: "News",
  components: {
    NewsComponent,
    ConsultComponent
  }
};
</script>