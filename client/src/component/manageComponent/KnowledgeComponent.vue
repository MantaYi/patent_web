<template>
  <div class="knowledge">
    <span>专利知识Id:{{knowledgeId}}</span>
    <el-button-group>
      <a>
        <el-button type="primary" icon="el-icon-edit" @click="change"></el-button>
      </a>
      <a href="javascript:">
        <el-button type="primary" icon="el-icon-delete" @click="knowledgeDelete"></el-button>
      </a>
    </el-button-group>
  </div>
</template>
<script>
//引入axios的qs模块
import qs from "qs";

export default {
  name: "ManageKnowledgeComponent",
  props: {
    knowledgeId: String,
    knowledgeHeadline: String,
    knowledgeContent: String,
    knowledgeArea: String
  },
  methods: {
    change() {
      let data = {
        knowledgeId: this.knowledgeId,
        knowledgeHeadline: this.knowledgeHeadline,
        knowledgeContent: this.knowledgeContent,
        knowledgeArea: this.knowledgeArea
      };
      localStorage.setItem("knowledgeChange", JSON.stringify(data));
      this.$router.push({ name: "KnowledgeChange" });
    },
    knowledgeDelete() {
      let url = "http://localhost:3000/manage/knowledgeDelete";
      let token = localStorage.getItem("PFUToken");
      token = JSON.parse(token).token;
      let data = {
        token,
        knowledgeId: this.knowledgeId
      };
      this.$http({
        method: "post",
        url,
        data: qs.stringify(data)
      }).then(res => {
        let PFUKnowledge = res.data;
        if (PFUKnowledge.err == 0) {
          this.$message({
            message: "知识删除成功",
            type: "success"
          });
        } else if (PFUKnowledge.err == -1) {
          this.$message({
            message: "用户未登录",
            type: "warning"
          });
        } else if (PFUKnowledge.err == -2) {
          this.$message.error("用户不存在");
        } else if (PFUKnowledge.err == -3) {
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
.knowledge {
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