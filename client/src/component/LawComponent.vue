<template>
  <router-link to="/law/details">
    <div class="law">
      <div>
        <span>相关领域：</span>
        <span>相关专利类型：</span>
      </div>
      <div>
        <p>政策法规内容：</p>
      </div>
      <div>
        <p>政策法规出处</p>
      </div>
    </div>
  </router-link>
</template>
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