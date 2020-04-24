<template>
  <div>
    <el-input v-model="id" placeholder="请输入专利Id"></el-input>
    <i class="el-icon-search" @click="getPatentById"></i>
    <patent-component
      v-for="(item,index) in patentList"
      :index="index"
      :key="item._id"
      :patentId="item._id"
      :patentName="item.patentName"
      :patentContent="item.patentContent"
      :patentApplicant="item.patentApplicant"
      :patentApplicantLocation="item.patentApplicantLocation"
      :patentFile="item.patentFile"
      :patentType="item.patentType"
      :patentArea="item.patentArea"
      :patentStatus="item.patentStatus"
      :patentApplyDate="item.patentApplyDate"
    ></patent-component>
  </div>
</template>
<script>
//引入axios的qs模块
import qs from "qs";

import PatentComponent from "../../component/manageComponent/PatentComponent";

export default {
  name: "ManagePatent",
  components: {
    PatentComponent
  },
  data() {
    return {
      id: "",
      patentList: []
    };
  },
  methods: {
    getPatentById() {
      if (this.id) {
        let patentId = this.id;
        let token = localStorage.getItem("PFUToken");
        token = JSON.parse(token).token;
        let data = {
          patentId,
          token
        };
        let url = "http://localhost:3000/manage/patentSearch";
        this.$http({
          method: "post",
          url,
          data: qs.stringify(data)
        }).then(res => {
          let PFUPatent = res.data;
          if (PFUPatent.err == 0) {
            this.$message({
              message: "查找专利成功",
              type: "success"
            });
            this.patentList = PFUPatent.data;
            localStorage.setItem(
              "managePatent",
              JSON.stringify({
                patentId: this.patentList[0]._id
              })
            );
          } else if (PFUPatent.err == -1) {
            this.$message({
              message: "用户未登录",
              type: "warning"
            });
          } else if (PFUPatent.err == -2) {
            this.$message.error("用户不存在");
          } else if (PFUPatent.err == -3) {
            this.$message.error("用户权限不足");
          } else if (PFUPatent.err == -4) {
            this.$message.error("专利不存在");
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