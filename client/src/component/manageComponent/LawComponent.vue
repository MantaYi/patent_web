<template>
  <div class="law">
    <span>法律法规Id:{{lawId}}</span>
    <el-button-group>
      <a>
        <el-button type="primary" icon="el-icon-edit" @click="change"></el-button>
      </a>
      <a href="javascript:">
        <el-button type="primary" icon="el-icon-delete" @click="lawDelete"></el-button>
      </a>
    </el-button-group>
  </div>
</template>
<script>
//引入axios的qs模块
import qs from "qs";

export default {
  name: "ManageLawComponent",
  props: {
    lawId: String,
    lawContent: String,
    lawFrom: String,
    lawPatentType: String,
    lawArea: String
  },
  methods: {
    change() {
      let data = {
        lawId: this.lawId,
        lawFrom: this.lawFrom,
        lawContent: this.lawContent,
        lawPatentType: this.lawPatentType,
        lawArea: this.lawArea
      };
      localStorage.setItem("lawChange", JSON.stringify(data));
      this.$router.push({ name: "lawChange" });
    },
    lawDelete() {
      let url = "http://localhost:3000/manage/lawDelete";
      let token = localStorage.getItem("PFUToken");
      token = JSON.parse(token).token;
      let data = {
        token,
        lawId: this.lawId
      };
      this.$http({
        method: "post",
        url,
        data: qs.stringify(data)
      }).then(res => {
        let PFULaw = res.data;
        if (PFULaw.err == 0) {
          this.$message({
            message: "法规删除成功",
            type: "success"
          });
        } else if (PFULaw.err == -1) {
          this.$message({
            message: "用户未登录",
            type: "warning"
          });
        } else if (PFULaw.err == -2) {
          this.$message.error("用户不存在");
        } else if (PFULaw.err == -3) {
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
.law {
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