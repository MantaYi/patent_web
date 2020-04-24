<template>
  <div>
    <div class="knowledgeNav">
      <el-button-group>
        <el-dropdown>
          <el-button type="primary">
            按专利领域查找
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown" @click.native="getKnowledgeByArea">
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
      <i class="el-icon-search" @click="getKnowledgeByKeyword"></i>
    </div>
    <consult-component></consult-component>
    <knowledge-component
      v-for="item in knowledgeList"
      :key="item._id"
      :knowledgeId="item._id"
      :knowledgeHeadline="item.knowledgeHeadline"
      :knowledgeContent="item.knowledgeContent"
      :knowledgeArea="item.knowledgeArea"
    ></knowledge-component>
  </div>
</template>
<script>
//引入axios的qs模块
import qs from "qs";

import KnowledgeComponent from "../../component/KnowledgeComponent";
import ConsultComponent from "../../component/consultComponent/ConsultComponent";

export default {
  name: "Knowledge",
  components: {
    KnowledgeComponent,
    ConsultComponent
  },
  data() {
    return {
      search: "",
      knowledgeList: []
    };
  },
  created() {
    let url = "http://localhost:3000/knowledge/search";
    this.$http({
      method: "get",
      url
    }).then(res => {
      let PFUKnowledge = res.data;
      if (PFUKnowledge.err == 0) {
        this.$message({
          message: "查找知识成功",
          type: "success"
        });
        this.knowledgeList = PFUKnowledge.data;
      } else if (PFUKnowledge.err == -1) {
        this.$message({
          message: "无知识",
          type: "warning"
        });
      } else {
        this.$message.error("服务器出错，请稍后再试");
      }
    });
  },
  methods: {
    getKnowledgeByArea() {
      let knowledgeArea = event.target.innerText;
      let data = {
        knowledgeArea
      };
      let url = "http://localhost:3000/knowledge/searchByArea";
      this.$http({
        method: "post",
        url,
        data: qs.stringify(data)
      }).then(res => {
        let PFUKnowledge = res.data;
        if (PFUKnowledge.err == 0) {
          this.$message({
            message: "查找知识成功",
            type: "success"
          });
          this.knowledgeList = PFUKnowledge.data;
        } else if (PFUKnowledge.err == -1) {
          this.$message({
            message: "无知识",
            type: "warning"
          });
        } else {
          this.$message.error("服务器出错，请稍后再试");
        }
      });
    },
    getKnowledgeByKeyword() {
      let data = {
        keyword: this.search
      };
      let url = "http://localhost:3000/knowledge/searchByKeyword";
      this.$http({
        method: "post",
        url,
        data: qs.stringify(data)
      }).then(res => {
        let PFUKnowledge = res.data;
        if (PFUKnowledge.err == 0) {
          this.$message({
            message: "查找知识成功",
            type: "success"
          });
          this.knowledgeList = PFUKnowledge.data;
        } else if (PFUKnowledge.err == -1) {
          this.$message({
            message: "无知识",
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
.knowledgeNav {
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