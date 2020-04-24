<template>
  <div class="patentDetails">
    <h1>专利名称</h1>
    <div>
      <el-tag>专利类型</el-tag>
      <el-tag>相关领域</el-tag>
    </div>
    <p>专利内容</p>
    <div>
      <span>专利申请人员</span>
      <span>专利申请日</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "PatentDetails"
};
</script>
<style lang="less" scoped>
.patentDetails {
  position: relative;
  h1 {
    text-align: center;
    margin-bottom: 20px;
    &::after {
      content: "申请成功";
      display: inline-block;
      width: 80px;
      height: 30px;
      border-radius: 15px;
      font-size: 14px;
      font-weight: 400;
      line-height: 30px;
      background-color: #16a951;
      position: relative;
      top: -20px;
    }
  }
  p {
    width: 800px;
    min-height: 200px;
    margin: 0 auto;
    text-indent: 2em;
  }
  > div {
    &:nth-child(2) {
      width: 200px;
      height: 60px;
      margin: 0 auto;
      span {
        margin: 0 10px;
      }
    }
    &:nth-child(4) {
      width: 800px;
      margin: 0 auto;
      span {
        &:last-of-type {
          float: right;
        }
      }
    }
  }
}
</style>