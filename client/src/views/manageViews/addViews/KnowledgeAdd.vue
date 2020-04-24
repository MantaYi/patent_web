<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="知识标题" prop="knowledgeHeadline">
        <el-input v-model="form.knowledgeHeadline"></el-input>
      </el-form-item>
      <el-form-item label="知识内容" prop="knowledgeContent">
        <el-input type="textarea" v-model="form.knowledgeContent"></el-input>
      </el-form-item>
      <el-form-item label="相关领域" prop="knowledgeArea">
        <el-select v-model="form.knowledgeArea" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.native="knowledgeAdd">增加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
//引入axios的qs模块
import qs from "qs";

export default {
  name: "KnowledgeAdd",
  data() {
    return {
      form: {
        knowledgeHeadline: "",
        knowledgeContent: "",
        knowledgeArea: ""
      },
      rules: {
        knowledgeHeadline: [{ required: true, message: "知识标题不能为空" }],
        knowledgeContent: [{ required: true, message: "知识内容不能为空" }],
        knowledgeArea: [{ required: true, message: "知识领域必需选择" }]
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
    knowledgeAdd() {
      if (
        this.form.knowledgeHeadline &&
        this.form.knowledgeContent &&
        this.form.knowledgeArea
      ) {
        let url = "http://localhost:3000/manage/knowledgeAdd";
        let token = localStorage.getItem("PFUToken");
        token = JSON.parse(token).token;
        let data = {
          token,
          knowledgeHeadline: this.form.knowledgeHeadline,
          knowledgeContent: this.form.knowledgeContent,
          knowledgeArea: this.form.knowledgeArea
        };
        this.$http({
          method: "post",
          url,
          data: qs.stringify(data)
        }).then(res => {
          let PFUKnowledge = res.data;
          if (PFUKnowledge.err == 0) {
            this.$message({
              message: "知识添加成功",
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