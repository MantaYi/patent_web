<template>
  <router-link @click="details">
    <div class="knowledge">
      <div>
        <h2>专利知识标题:{{knowledgeHeadline}}</h2>
      </div>
      <div>
        <p>专利知识内容:{{knowledgeContent}}</p>
      </div>
      <div>
        <p>相关领域:{{knowledgeArea}}</p>
      </div>
    </div>
  </router-link>
</template>
<script>
export default {
  name: "KnowledgeComponent",
  props: {
    knowledgeId: String,
    knowledgeHeadline: String,
    knowledgeContent: String,
    knowledgeArea: String
  }
};
</script>
<style lang="less" scoped>
a {
  color: #000;
}
.knowledge {
  width: 800px;
  height: 300px;
  margin: 0 auto;
  border-radius: 4px;
  border: 2px solid #003472;
  margin-bottom: 20px;
  padding-top: 20px;
  padding-left: 20px;
  div {
    &:nth-child(2) {
      height: 200px;
    }
  }
}
</style>