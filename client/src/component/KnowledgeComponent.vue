<template>
  <router-link to="/knowledge/details">
    <div class="knowledge">
      <div>
        <h2>专利知识标题</h2>
      </div>
      <div>
        <p>专利知识内容：</p>
      </div>
      <div>
        <p>相关领域：</p>
      </div>
    </div>
  </router-link>
</template>
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