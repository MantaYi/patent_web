<template>
  <div>
    <el-input v-model="id" placeholder="请输入新闻Id"></el-input>
    <i class="el-icon-search" @click="getNewsById"></i>
    <news-component
      v-for="item in newsList"
      :key="item._id"
      :newsId="item._id"
      :newsHeadline="item.newsHeadline"
      :newsContent="item.newsContent"
      :newsDate="item.newsDate"
      :newsArea="item.newsArea"
    ></news-component>
  </div>
</template>
<script>
//引入axios的qs模块
import qs from "qs";

import NewsComponent from "../../component/manageComponent/NewsComponent";

export default {
  name: "ManageNews",
  components: {
    NewsComponent
  },
  data() {
    return {
      id: "",
      newsList: []
    };
  },
  methods: {
    getNewsById() {
      if (this.id) {
        let newsId = this.id;
        let token = localStorage.getItem("PFUToken");
        token = JSON.parse(token).token;
        let data = {
          newsId,
          token
        };
        let url = "http://localhost:3000/manage/newsSearch";
        this.$http({
          method: "post",
          url,
          data: qs.stringify(data)
        }).then(res => {
          let PFUNews = res.data;
          if (PFUNews.err == 0) {
            this.$message({
              message: "查找新闻成功",
              type: "success"
            });
            this.newsList = PFUNews.data;
            localStorage.setItem(
              "manageKnowledge",
              JSON.stringify({
                newsId: this.newsList[0]._id
              })
            );
          } else if (PFUNews.err == -1) {
            this.$message({
              message: "用户未登录",
              type: "warning"
            });
          } else if (PFUNews.err == -2) {
            this.$message.error("用户不存在");
          } else if (PFUNews.err == -3) {
            this.$message.error("用户权限不足");
          } else if (PFUNews.err == -4) {
            this.$message.error("新闻不存在");
          } else {
            this.$message.error("服务器出错，请稍后再试");
          }
        });
      } else {
        this.$message({
          message: "Id不能为空",
          type: "warning"
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
.el-input {
  margin-left: 20px;
  display: inline-block;
  width: 200px;
}
.el-icon-search {
  width: 60px;
  height: 40px;
  background-color: #003472;
  color: #fff;
  text-align: center;
  line-height: 40px;
  border-radius: 6px;
  cursor: pointer;
}
</style>