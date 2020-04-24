<template>
  <div class="news">
    <span>新闻Id:{{newsId}}</span>
    <el-button-group>
      <a>
        <el-button type="primary" icon="el-icon-edit" @click="change"></el-button>
      </a>
      <a href="javascript:">
        <el-button type="primary" icon="el-icon-delete" @click="newsDelete"></el-button>
      </a>
    </el-button-group>
  </div>
</template>
<script>
//引入axios的qs模块
import qs from "qs";

export default {
  name: "ManageNewsComponent",
  props: {
    newsId: String,
    newsContent: String,
    newsHeadline: String,
    newsDate: Date,
    newsArea: String
  },
  methods: {
    change() {
      let data = {
        newsId: this.newsId,
        newsContent: this.newsContent,
        newsHeadline: this.newsHeadline,
        newsDate: this.newsDate,
        newsArea: this.newsArea
      };
      localStorage.setItem("newsChange", JSON.stringify(data));
      this.$router.push({ name: "newsChange" });
    },
    newsDelete() {
      let url = "http://localhost:3000/manage/newsDelete";
      let token = localStorage.getItem("PFUToken");
      token = JSON.parse(token).token;
      let data = {
        token,
        newsId: this.newsId
      };
      this.$http({
        method: "post",
        url,
        data: qs.stringify(data)
      }).then(res => {
        let PFUNews = res.data;
        if (PFUNews.err == 0) {
          this.$message({
            message: "新闻删除成功",
            type: "success"
          });
        } else if (PFUNews.err == -1) {
          this.$message({
            message: "用户未登录",
            type: "warning"
          });
        } else if (PFUNews.err == -2) {
          this.$message.error("用户不存在");
        } else if (PFUNews.err == -3) {
          this.$message.error("用户权限不足");
        } else {
          this.$message.error("服务器出错，请稍后再试");
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.news {
  width: 1000px;
  height: 50px;
  padding: 5px 50px 0px 50px;
  margin: 0 auto;
  border: 2px solid #003472;
  border-radius: 4px;
  margin-bottom: 20px;
  span {
    line-height: 40px;
    margin: 0 10px;
  }
  .el-button-group {
    float: right;
  }
}
</style>