<template>
  <div class="patent">
    <span>专利名称:{{patentName}}</span>
    <span>专利状态:{{patentStatusZh}}</span>
    <el-button-group>
      <a>
        <el-button type="primary" icon="el-icon-edit" @click="change"></el-button>
      </a>
      <a href="javascript:">
        <el-button type="primary" icon="el-icon-delete" @click="patentDelete"></el-button>
      </a>
      <a href="javascript:">
        <el-button type="primary" icon="el-icon-arrow-right" @click="patentNext"></el-button>
      </a>
    </el-button-group>
  </div>
</template>
<script>
//引入axios的qs模块
import qs from "qs";

export default {
  name: "ManagePatentComponent",
  props: {
    patentId: String,
    patentName: String,
    patentContent: String,
    patentApplicant: String,
    patentApplicantLocation: String,
    patentFile: String,
    patentType: String,
    patentArea: String,
    patentStatus: Number,
    patentApplyDate: String
  },
  computed: {
    patentStatusZh() {
      if (this.patentStatus == 0) {
        return "已受理";
      } else if (this.patentStatus == 1) {
        return "初审中";
      } else if (this.patentStatus == 2) {
        return "公开";
      } else if (this.patentStatus == 3) {
        return "实审中";
      } else if (this.patentStatus == 4) {
        return "有权";
      } else {
        return "无权";
      }
    }
  },
  methods: {
    change() {
      let data = {
        patentId: this.form.patentId,
        patentName: this.form.patentName,
        patentContent: this.form.patentContent,
        patentApplicant: this.form.patentApplicant,
        patentApplicantLocation: this.form.patentApplicantLocation,
        patentFile: this.form.patentFile,
        patentType: this.form.patentType,
        patentArea: this.form.patentArea,
        patentStatus: this.form.patentStatus,
        patentApplyDate: this.form.patentApplyDate
      };
      localStorage.setItem("patentChange", JSON.stringify(data));
      this.$router.push({ name: "patentChange" });
    },
    patentDelete() {
      let url = "http://localhost:3000/manage/patentDelete";
      let token = localStorage.getItem("PFUToken");
      token = JSON.parse(token).token;
      let data = {
        token,
        patentId: this.patentId
      };
      this.$http({
        method: "post",
        url,
        data: qs.stringify(data)
      }).then(res => {
        let PFUPatent = res.data;
        if (PFUPatent.err == 0) {
          this.$message({
            message: "专利删除成功",
            type: "success"
          });
        } else if (PFUPatent.err == -1) {
          this.$message({
            message: "用户未登录",
            type: "warning"
          });
        } else if (PFUPatent.err == -2) {
          this.$message.error("用户不存在");
        } else if (PFUPatent.err == -3) {
          this.$message.error("用户权限不足");
        } else {
          this.$message.error("服务器出错，请稍后再试");
        }
      });
    },
    patentNext() {
      let url = "http://localhost:3000/manage/patentStatusChange";
      let token = localStorage.getItem("PFUToken");
      token = JSON.parse(token).token;
      let data = {
        token,
        patentId: this.patentId
      };
      this.$http({
        method: "post",
        url,
        data: qs.stringify(data)
      }).then(res => {
        let PFUPatent = res.data;
        if (PFUPatent.err == 0) {
          this.$message({
            message: "专利审核进入下一阶段",
            type: "success"
          });
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
        } else if (PFUPatent.err == -5) {
          this.$message({
            message: "专利已获权，无需审核",
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
.patent {
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