<template>
  <div>
    <div class="newsNav">
      <el-button-group>
        <el-dropdown>
          <el-button type="primary">
            按专利领域查找
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown" @click.native="getNewsByArea">
            <el-dropdown-item>人类生活需要</el-dropdown-item>
            <el-dropdown-item>作业运输</el-dropdown-item>
            <el-dropdown-item>化学冶金</el-dropdown-item>
            <el-dropdown-item>纺织造纸</el-dropdown-item>
            <el-dropdown-item>固定建筑物</el-dropdown-item>
            <el-dropdown-item>机械工程</el-dropdown-item>
            <el-dropdown-item>物理</el-dropdown-item>
            <el-dropdown-item>电学</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-button-group>
      <el-input v-model="search" placeholder="请输入关键词"></el-input>
      <i class="el-icon-search" @click="getNewsByKeyword"></i>
    </div>
    <consult-component></consult-component>
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

import NewsComponent from "../../component/NewsComponent";
import ConsultComponent from "../../component/consultComponent/ConsultComponent";

export default {
  name: "News",
  components: {
    NewsComponent,
    ConsultComponent
  },
  data() {
    return {
      search: "",
      newsList: []
    };
  },
  created() {
    let url = "http://localhost:3000/news/search";
    this.$http({
      method: "get",
      url
    }).then(res => {
      let PFUNews = res.data;
      if (PFUNews.err == 0) {
        this.$message({
          message: "查找新闻成功",
          type: "success"
        });
        this.newsList = PFUNews.data;
      } else if (PFUNews.err == -1) {
        this.$message({
          message: "无相关新闻",
          type: "warning"
        });
      } else {
        this.$message.error("服务器出错，请稍后再试");
      }
    });
  },
  methods: {
    getNewsByArea() {
      let newsArea = event.target.innerText;
      let data = {
        newsArea
      };
      let url = "http://localhost:3000/news/searchByArea";
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
        } else if (PFUNews.err == -1) {
          this.$message({
            message: "无相关新闻",
            type: "warning"
          });
        } else {
          this.$message.error("服务器出错，请稍后再试");
        }
      });
    },
    getNewsByKeyword() {
      let data = {
        keyword: this.search
      };
      let url = "http://localhost:3000/news/searchByKeyword";
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
        } else if (PFUNews.err == -1) {
          this.$message({
            message: "无相关新闻",
            type: "warning"
          });
        } else {
          this.$message.error("服务器出错，请稍后再试");
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.newsNav {
  width: 800px;
  height: 50px;
  margin: 0 auto;
  .el-button-group {
    .el-dropdown {
      margin: 0 10px;
    }
  }
  .el-input {
    margin-left: 350px;
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
}
</style>