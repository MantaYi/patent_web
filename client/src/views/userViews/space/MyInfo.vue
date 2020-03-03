<template>
  <div class="myInfo">
    <p>用户名称：</p>
    <p>用户邮箱：</p>
    <p>手机号码：</p>
    <p>拥有专利数量：</p>
    <p>上传文件数量：</p>
    <p>购买文件数量：</p>
  </div>
</template>
<script>
export default {
  name: "MyInfo"
};
</script>
<style lang="less" scoped>
.myInfo {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 1000px;
  margin: 0 auto;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding-top: 40px;
  p {
    width: 500px;
    height: 100px;
    margin: 0 auto;
    font-size: 30px;
    text-align: left;
  }
}
</style>
