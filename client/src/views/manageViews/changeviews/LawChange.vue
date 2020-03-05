<template>
  <div class="fileChange">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="文件名称">
        <el-input v-model="form.fileName"></el-input>
      </el-form-item>
      <el-form-item label="文件价格">
        <el-input v-model="form.filePrice"></el-input>
      </el-form-item>
      <el-form-item label="专利类型" prop="filePatentType">
        <el-radio-group v-model="form.patentType">
          <el-radio-button v-model="form.patentType" label="发明专利"></el-radio-button>
          <el-radio-button v-model="form.patentType" label="实用新型专利"></el-radio-button>
          <el-radio-button v-model="form.patentType" label="外观设计专利"></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="专利领域" prop="patentArea">
        <el-select v-model="form.patentArea" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">修改文件</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "fileChange",
  data() {
    return {
      form: {},
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
  }
};
</script>
<style lang="less" scoped>
.fileChange {
  width: 800px;
  min-height: 200px;
  margin: 0 auto;
}
</style>