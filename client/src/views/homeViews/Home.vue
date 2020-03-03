<template src="./Home.vue.html" lang="html">
<!-- html内容文件分离 -->
</template>

<script>
//引入进入咨询的入口
import ConsultComponent from "../../component/consultComponent/ConsultComponent";

export default {
  name: "Home",
  components: {
    ConsultComponent
  }
};
</script>

<style lang="less" scoped>
// less文件分离
@import "./Home.vue.less";
</style>