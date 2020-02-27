<template>
  <div>
    <el-col :span="24">
      <div class="footer">
        <img
          src="../assets/logo_left.png"
          alt="patent for you"
          height="80px"
          class="left"
        />
        <div class="left">
          <p>
            <span>关于我们</span>
            <span>联系我们</span>
            <span>加入我们</span>
            <span>用户协议</span>
            <span>copyright &copy; 2020</span>
          </p>
        </div>
      </div>
    </el-col>
  </div>
</template>

<style lang="less" scoped>
.footer {
  width: 100%;
  min-width: 1000px;
  height: 100px;
  background-color: #003472;
  display: flex;
  justify-content: space-around;
  img {
    text-align: center;
    margin-top: 10px;
    margin-left: 100px;
  }
  .left {
    float: left;
    p {
      width: 1000px;
      display: flex;
      justify-content: space-around;
      span {
        display: inline-block;
        height: 50px;
        text-align: center;
        line-height: 20px;
        margin-top: 40px;
        font-size: 18px;
      }
    }
  }
}
</style>
