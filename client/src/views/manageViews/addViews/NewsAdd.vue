<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="新闻标题">
        <el-input v-model="form.newsHeadline"></el-input>
      </el-form-item>
      <el-form-item label="新闻内容">
        <el-input type="textarea" v-model="form.newsContent"></el-input>
      </el-form-item>
      <el-form-item label="相关领域" prop="newsPatentArea">
        <el-select v-model="form.newsPatentArea" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="新闻时间">
        <el-date-picker
          v-model="form.newsDate"
          align="right"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">增加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "newsAdd",
  data() {
    return {
      form: {
        newsHeadline: "",
        newsContent: "",
        newsPatentArea: "",
        newsDate: ""
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
      ],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      }
    };
  }
};
</script>