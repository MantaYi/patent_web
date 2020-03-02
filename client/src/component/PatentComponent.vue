<template>
  <router-link to="/patent/details">
    <div class="patent">
      <div>
        <span>专利名称：</span>
        <span>专利类型：</span>
        <span>专利领域：</span>
      </div>
      <div class="content">
        <p>专利内容：</p>
        <span></span>
      </div>
      <div>
        <span>专利申请人：</span>
        <span>申请日：</span>
      </div>
      <div class="status">
        <span>申请成功</span>
      </div>
    </div>
  </router-link>
</template>
<style lang="less" scoped>
a {
  color: #000;
}
.patent {
  width: 800px;
  height: 300px;
  margin: 0 auto;
  border-radius: 4px;
  border: 2px solid #003472;
  padding: 20px 20px 0 20px;
  margin-bottom: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  div {
    &:first-of-type {
      span {
        display: inline-block;
        width: 200px;
      }
    }
    &:nth-child(3) {
      span {
        display: inline-block;
        width: 350px;
        &:last-of-type {
          text-align: right;
        }
      }
    }
  }
  .content {
    height: 210px;
  }
  .status {
    width: 200px;
    height: 30px;
    line-height: 30px;
    position: relative;
    transform: rotate(30deg);
    background-color: #16a951;
    text-align: center;
    right: -600px;
    top: -250px;
  }
}
</style>