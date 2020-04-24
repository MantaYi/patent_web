<template>
  <div>
    <el-input v-model="id" placeholder="请输入知识Id"></el-input>
    <i class="el-icon-search" @click="getLawById"></i>
    <law-component
      v-for="item in lawList"
      :key="item._id"
      :lawId="item._id"
      :lawContent="item.lawContent"
      :lawFrom="item.lawFrom"
      :lawPatentType="item.lawPatentType"
      :lawArea="item.lawArea"
    ></law-component>
  </div>
</template>
<script>
//引入axios的qs模块
import qs from "qs";

import LawComponent from "../../component/manageComponent/LawComponent";

export default {
  name: "ManageLaw",
  components: {
    LawComponent
  },
  data() {
    return {
      id: "",
      lawList: []
    };
  },
  methods: {
    getLawById() {
      if (this.id) {
        let lawId = this.id;
        let token = localStorage.getItem("PFUToken");
        token = JSON.parse(token).token;
        let data = {
          lawId,
          token
        };
        let url = "http://localhost:3000/manage/lawSearch";
        this.$http({
          method: "post",
          url,
          data: qs.stringify(data)
        }).then(res => {
          let PFULaw = res.data;
          if (PFULaw.err == 0) {
            this.$message({
              message: "查找法规成功",
              type: "success"
            });
            this.lawList = PFULaw.data;
            localStorage.setItem(
              "manageKnowledge",
              JSON.stringify({
                lawId: this.lawList[0]._id
              })
            );
          } else if (PFULaw.err == -1) {
            this.$message({
              message: "用户未登录",
              type: "warning"
            });
          } else if (PFULaw.err == -2) {
            this.$message.error("用户不存在");
          } else if (PFULaw.err == -3) {
            this.$message.error("用户权限不足");
          } else if (PFULaw.err == -4) {
            this.$message.error("法规不存在");
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