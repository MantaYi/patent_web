<template>
  <router-link to="/news/details">
    <div class="news">
      <div>
        <i class="el-icon-picture-outline"></i>
      </div>
      <div>
        <div>
          <h2>新闻标题：</h2>
        </div>
        <div>
          <p>新闻内容：</p>
        </div>
        <div>
          <span>新闻领域：</span>
          <span>新闻发布时间：2020-03-02</span>
        </div>
      </div>
    </div>
  </router-link>
</template>
<style lang="less" scoped>
a {
  color: #000;
}
.news {
  width: 800px;
  height: 300px;
  margin: 0 auto;
  border-radius: 4px;
  border: 2px solid #003472;
  margin-bottom: 20px;
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
  > div {
    &:first-of-type {
      i {
        font-size: 320px;
        position: relative;
        top: -20px;
      }
    }
    &:last-of-type {
      width: 500px;
      display: flex;
      flex-direction: column;
      div {
        &:nth-child(2) {
          width: 400px;
          height: 200px;
        }
        &:last-of-type {
          span {
            display: inline-block;
            width: 230px;
            &:nth-child(1) {
              text-align: center;
            }
            &:nth-child(2) {
              text-align: right;
            }
          }
        }
      }
    }
  }
}
</style>