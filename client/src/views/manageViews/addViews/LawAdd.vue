<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="法规出处">
        <el-input v-model="form.lawFrom"></el-input>
      </el-form-item>
      <el-form-item label="法规内容">
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
        <el-button type="primary" @click="onSubmit">增加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "lawAdd",
  data() {
    return {
      form: {
        lawHeadline: "",
        lawContent: "",
        lawPatentType: "",
        lawArea: ""
      },
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