<template>
  <router-link to="/file/details">
    <div class="file">
      <p>
        <i class="el-icon-document"></i>
      </p>
      <div>
        <p>
          <span>文件名称：</span>
        </p>
        <p>
          <span>专利类型：</span>
          <span>相关领域：</span>
        </p>
        <p>
          <span>上传人员：</span>
          <span>文件价格：</span>
        </p>
        <p>
          <span>购买次数：</span>
          <span>下载次数：</span>
          <span>举报次数：</span>
        </p>
      </div>
      <p>
        <el-button type="primary" @click="parchase">购买文件</el-button>
        <el-button type="success" @click="download">下载文件</el-button>
        <el-button type="danger" @click="inform">举报文件</el-button>
      </p>
    </div>
  </router-link>
</template>
<style lang="less" scoped>
a {
  color: #000;
}
.file {
  width: 800px;
  height: 200px;
  margin: 0 auto;
  border-radius: 4px;
  border: 2px solid #003472;
  display: flex;
  justify-content: space-around;
  padding-top: 20px;
  margin-bottom: 20px;
  > p {
    i {
      padding-left: 20px;
      padding-right: 20px;
      font-size: 170px;
    }
    &:first-of-type {
      width: 200px;
    }
    &:last-of-type {
      width: 100px;
      padding-right: 20px;
      .el-button {
        margin: 0;
        padding: 0;
        width: 80px;
        height: 40px;
        margin-bottom: 20px;
      }
    }
  }
  > div {
    width: 460px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    p {
      height: 20px;
      margin-bottom: 20px;
      &:nth-child(2) {
        span {
          display: inline-block;
          width: 200px;
        }
      }
      &:nth-child(3) {
        span {
          display: inline-block;
          width: 200px;
        }
      }
      &:last-of-type {
        width: 460px;
        span {
          display: inline-block;
          width: 150px;
        }
      }
    }
  }
}
</style>