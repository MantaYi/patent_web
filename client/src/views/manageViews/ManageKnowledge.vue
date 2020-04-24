<template>
  <div>
    <el-input v-model="id" placeholder="请输入知识Id"></el-input>
    <i class="el-icon-search" @click="getKnowledgeById"></i>
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

import KnowledgeComponent from "../../component/manageComponent/KnowledgeComponent";

export default {
  name: "ManageKnowledge",
  components: {
    KnowledgeComponent
  },
  data() {
    return {
      id: "",
      knowledgeList: []
    };
  },
  methods: {
    getKnowledgeById() {
      if (this.id) {
        let knowledgeId = this.id;
        let token = localStorage.getItem("PFUToken");
        token = JSON.parse(token).token;
        let data = {
          knowledgeId,
          token
        };
        let url = "http://localhost:3000/manage/knowledgeSearch";
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
            localStorage.setItem(
              "manageKnowledge",
              JSON.stringify({
                knowledgeId: this.knowledgeList[0]._id
              })
            );
          } else if (PFUKnowledge.err == -1) {
            this.$message({
              message: "用户未登录",
              type: "warning"
            });
          } else if (PFUKnowledge.err == -2) {
            this.$message.error("用户不存在");
          } else if (PFUKnowledge.err == -3) {
            this.$message.error("用户权限不足");
          } else if (PFUKnowledge.err == -4) {
            this.$message.error("知识不存在");
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