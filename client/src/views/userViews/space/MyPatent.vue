<template>
  <div class="myPatent">
    <patent-component
      v-for="item in userPatent"
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
import PatentComponent from "../../../component/PatentComponent";

export default {
  name: "MyPatent",
  components: {
    PatentComponent
  },
  data() {
    return {
      userPatent: []
    };
  },
  created() {
    let url = "http://localhost:3000/user/myPatent";
    let token = localStorage.getItem("PFUToken");
    token = JSON.parse(token).token;
    let data = {
      token
    };
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
        this.userPatent = PFUPatent.userPatent;
      } else if (PFUPatent.err == -1) {
        this.$message({
          message: "用户未登录",
          type: "warning"
        });
      } else if (PFUPatent.err == -2) {
        this.$message.error("用户不存在");
      } else {
        this.$message.error("服务器出错，请稍后再试");
      }
    });
  }
};
</script>
<style lang="less" scoped>
.myPatent {
  width: 1000px;
  min-height: 500px;
  margin: 0 auto;
  margin-top: 20px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding-top: 20px;
}
</style>