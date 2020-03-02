<template>
  <div class="apply">
    <p>专利申请</p>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="专利名称">
        <el-input v-model="form.patentName" clearable></el-input>
      </el-form-item>
      <el-form-item label="专利描述">
        <el-input type="textarea" v-model="form.patentContent" :rows="5" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="form.patentApplicationLocation" clearable></el-input>
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
      <el-upload multiple :limit="3" :file-list="fileList">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传文档</div>
      </el-upload>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即申请</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "PatentApply",
  data() {
    return {
      form: {
        patentName: "",
        patentContent: "",
        patentApplicationLocation: "",
        patentFile: "",
        patentType: 0,
        patentArea: ""
      },
      fileList: [],
      options: [
        {
          value: "A",
          label: "人类生活需要"
        },
        {
          value: "B",
          label: "作业运输"
        },
        {
          value: "C",
          label: "化学冶金"
        },
        {
          value: "D",
          label: "纺织造纸"
        },
        {
          value: "E",
          label: "固定建筑物"
        },
        {
          value: "F",
          label: "机械工程"
        },
        {
          value: "G",
          label: "物理"
        },
        {
          value: "H",
          label: "电学"
        }
      ]
    };
  },
  methods: {
    onSubmit() {}
  }
};
</script>
<style lang="less" scoped>
.apply {
  width: 1000px;
  min-height: 1000px;
  margin: 0 auto;
  p {
    height: 100px;
    font-size: 60px;
    line-height: 100px;
    text-align: center;
  }
  .el-form {
    width: 700px;
    height: 700px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .el-form-item {
      width: 700px;
      margin-bottom: 20px;
      &:last-of-type {
        text-align: center;
        .el-button {
          width: 100px;
          height: 40px;
        }
      }
    }
    .el-upload {
      width: 200px;
      height: 100px;
      margin: 0 auto;
    }
  }
}
</style>