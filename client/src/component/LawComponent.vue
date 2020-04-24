<template>
  <div class="law">
    <div>
      <span>相关领域:{{lawArea}}</span>
      <span>相关专利类型:{{lawPatentType}}</span>
    </div>
    <div>
      <p>政策法规内容:{{lawContent}}</p>
    </div>
    <div>
      <p>——————{{lawFrom}}</p>
    </div>
  </div>
</template>
<script>
//引入axios的qs模块
import qs from "qs";

export default {
  name: "LawComponent",
  props: {
    lawId: String,
    lawFrom: String,
    lawContent: String,
    lawPatentType: String,
    lawArea: String
  }
};
</script>
<style lang="less" scoped>
a {
  color: #000;
}
.law {
  width: 800px;
  height: 300px;
  margin: 0 auto;
  border-radius: 4px;
  border: 2px solid #003472;
  margin-bottom: 20px;
  padding: 20px 20px 0px 20px;
  div {
    &:first-child {
      span {
        display: inline-block;
        width: 350px;
        text-align: left;
      }
    }
    &:nth-child(2) {
      height: 200px;
    }
    &:nth-child(3) {
      text-align: right;
    }
  }
}
</style>