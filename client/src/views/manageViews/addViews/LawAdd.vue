<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="法规出处" prop="lawFrom">
        <el-input v-model="form.lawFrom"></el-input>
      </el-form-item>
      <el-form-item label="法规内容" prop="lawContent">
        <el-input type="textarea" v-model="form.lawContent"></el-input>
      </el-form-item>
      <el-form-item label="专利类型" prop="lawPatentType">
        <el-radio-group v-model="form.lawPatentType">
          <el-radio-button v-model="form.lawPatentType" label="发明专利"></el-radio-button>
          <el-radio-button v-model="form.lawPatentType" label="实用新型专利"></el-radio-button>
          <el-radio-button v-model="form.lawPatentType" label="外观设计专利"></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="相关领域" prop="lawArea">
        <el-select v-model="form.lawArea" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="lawAdd">增加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
//引入axios的qs模块
import qs from "qs";

export default {
  name: "lawAdd",
  data() {
    return {
      form: {
        lawFrom: "",
        lawContent: "",
        lawPatentType: "",
        lawArea: ""
      },
      rules: {
        lawFrom: [{ required: true, message: "知识出处不能为空" }],
        lawContent: [{ required: true, message: "知识内容不能为空" }],
        lawPatentType: [{ required: true, message: "专利类型必需选择" }],
        lawArea: [{ required: true, message: "知识领域必需选择" }]
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
  methods: {
    lawAdd() {
      if (
        this.form.lawFrom &&
        this.form.lawContent &&
        this.form.lawPatentType &&
        this.form.lawArea
      ) {
        let url = "http://localhost:3000/manage/lawAdd";
        let token = localStorage.getItem("PFUToken");
        token = JSON.parse(token).token;
        let data = {
          token,
          lawFrom: this.form.lawFrom,
          lawContent: this.form.lawContent,
          lawPatentType: this.form.lawPatentType,
          lawArea: this.form.lawArea
        };
        this.$http({
          method: "post",
          url,
          data: qs.stringify(data)
        }).then(res => {
          let PFULaw = res.data;
          if (PFULaw.err == 0) {
            this.$message({
              message: "法规添加成功",
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
            this.$message.error("权限不足");
          } else {
            this.$message.error("服务器出错，请稍后再试");
          }
        });
      } else {
        this.$message({
          message: "请正确输入相关信息",
          type: "warning"
        });
      }
    }
  }
};
</script>