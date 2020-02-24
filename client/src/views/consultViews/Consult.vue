<template>
  <div class="consult">
    <el-container>
      <el-aside width="200px"></el-aside>
      <el-container>
        <el-header>
          <p>客服咨询 正在连线中</p>
        </el-header>
        <el-main></el-main>
        <el-input type="textarea" v-model="textarea" placeholder="请在此处输入聊天内容"></el-input>
        <el-button type="primary">发送</el-button>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  name: "consult",
  data() {
    return {
      textarea: ""
    };
  }
};
</script>

<style lang="less">
.consult {
  width: 100%;
  height: 1000px;
  background-color: skyblue;
  > .el-container {
    width: 1000px;
    height: 800px;
    margin: 0 auto;
    padding-top: 20px;
    .el-aside {
      height: 800px;
      background-color: #fff;
      border-radius: 10px;
    }
    > .el-container {
      margin-left: 20px;
      width: 780px;
      height: 800px;
      flex-direction: column;
      .el-header {
        background-color: wheat;
        border-radius: 10px;
        p {
          line-height: 60px;
          font-size: 15px;
        }
      }
      .el-main {
        background-color: #fff;
        border: 2px solid #0073ff;
        border-radius: 10px;
        margin-top: 10px;
      }
      .el-textarea__inner {
        height: 160px;
        resize: none;
        border: 2px solid #0073ff;
        border-radius: 10px;
        margin-top: 10px;
        font-size: 18px;
      }
      .el-button {
        width: 100px;
        height: 40px;
        position: absolute;
        top: 820px;
        right: 280px;
      }
    }
  }
}
</style>