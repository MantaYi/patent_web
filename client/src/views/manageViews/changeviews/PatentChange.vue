<template>
  <div class="patentChange">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="专利名称">
        <el-input v-model="form.patentName"></el-input>
      </el-form-item>
      <el-form-item label="专利描述">
        <el-input type="textarea" v-model="form.patentContent"></el-input>
      </el-form-item>
      <el-form-item label="专利类型">
        <el-radio-group v-model="form.patentType">
          <el-radio-button v-model="form.patentType" label="发明专利"></el-radio-button>
          <el-radio-button v-model="form.patentType" label="实用新型专利"></el-radio-button>
          <el-radio-button v-model="form.patentType" label="外观设计专利"></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="专利领域">
        <el-select v-model="form.patentArea" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="专利状态">
        <el-input v-model="form.patentStatus"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="change">修改专利</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
//引入axios的qs模块
import qs from "qs";

export default {
  name: "patentChange",
  data() {
    return {
      form: {
        patentId: "",
        patentName: "",
        patentContent: "",
        patentApplicant: "",
        patentApplicantLocation: "",
        patentFile: "",
        patentType: "",
        patentArea: "",
        patentStatus: 0,
        patentApplyDate: ""
      },
      options: [
        {
          value: "人类生活需要",
          label: "人类生活需要"
        },
        {
          value: "作业运输",
          label: "作业运输"
        },
        {
          value: "化学冶金",
          label: "化学冶金"
        },
        {
          value: "纺织造纸",
          label: "纺织造纸"
        },
        {
          value: "固定建筑物",
          label: "固定建筑物"
        },
        {
          value: "机械工程",
          label: "机械工程"
        },
        {
          value: "物理",
          label: "物理"
        },
        {
          value: "电学",
          label: "电学"
        }
      ]
    };
  },
  created() {
    let data = JSON.parse(localStorage.getItem("patentChange"));
    this.form.patentId = data.patentId;
    this.form.patentName = data.patentName;
    this.form.patentContent = data.patentContent;
    this.form.patentApplicant = data.patentApplicant;
    this.form.patentApplicantLocation = data.patentApplicantLocation;
    this.form.patentFile = data.patentFile;
    this.form.patentType = data.patentType;
    this.form.patentArea = data.patentArea;
    this.form.patentStatus = data.patentStatus;
    this.form.patentApplyDate = data.patentApplyDate;
  },
  methods: {
    change() {
      if (
        this.form.patentId &&
        this.form.patentName &&
        this.form.patentContent &&
        this.form.patentApplicant &&
        this.form.patentApplicantLocation &&
        this.form.patentFile &&
        this.form.patentType &&
        this.form.patentArea &&
        this.form.patentStatus &&
        this.form.patentApplyDate
      ) {
        let url = "http://localhost:3000/manage/patentChange";
        let token = localStorage.getItem("PFUToken");
        token = JSON.parse(token).token;
        let data = {
          token,
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
        this.$http({
          method: "post",
          url,
          data: qs.stringify(data)
        }).then(res => {
          let PFUChange = res.data;
          if (PFUChange.err == 0) {
            this.$message({
              message: "修改成功",
              type: "success"
            });
          } else if (PFUChange.err == -1) {
            this.$message({
              message: "请先登录",
              type: "warning"
            });
          } else if (PFUChange.err == -2) {
            this.$message.error("用户不存在");
          } else if (PFUChange.err == -3) {
            this.$message.error("用户权限不足");
          } else {
            //服务器错误处理
            this.$message.error("服务器出错，请稍后再试");
          }
        });
      } else {
        this.$message({
          message: "请正确修改相关信息",
          type: "warning"
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
.patentChange {
  width: 800px;
  min-height: 200px;
  margin: 0 auto;
}
</style>