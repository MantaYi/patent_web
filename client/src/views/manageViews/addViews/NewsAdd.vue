<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="新闻标题" prop="newsHeadline">
        <el-input v-model="form.newsHeadline"></el-input>
      </el-form-item>
      <el-form-item label="新闻内容" prop="newsContent">
        <el-input type="textarea" v-model="form.newsContent"></el-input>
      </el-form-item>
      <el-form-item label="相关领域" prop="newsArea">
        <el-select v-model="form.newsArea" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="新闻时间" prop="newsDate">
        <el-date-picker
          v-model="form.newsDate"
          align="right"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="newsAdd">增加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
//引入axios的qs模块
import qs from "qs";

export default {
  name: "newsAdd",
  data() {
    return {
      form: {
        newsHeadline: "",
        newsContent: "",
        newsArea: "",
        newsDate: ""
      },
      rules: {
        newsHeadline: [
          { required: true, message: "新闻标题不能为空", trigger: "blur" }
        ],
        newsContent: [
          { required: true, message: "新闻内容不能为空", trigger: "blur" }
        ],
        newsArea: [
          { required: true, message: "新闻专业领域不能为空", trigger: "blur" }
        ],
        newsDate: [
          { required: true, message: "新闻日期不能为空", trigger: "blur" }
        ]
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
  },
  methods: {
    newsAdd() {
      console.log(this.form.newsDate);
      if (
        this.form.newsHeadline &&
        this.form.newsContent &&
        this.form.newsArea &&
        this.form.newsDate
      ) {
        let url = "http://localhost:3000/manage/newsAdd";
        let token = localStorage.getItem("PFUToken");
        token = JSON.parse(token).token;
        let data = {
          token,
          newsHeadline: this.form.newsHeadline,
          newsContent: this.form.newsContent,
          newsArea: this.form.newsArea,
          newsDate: this.form.newsDate
        };
        this.$http({
          method: "post",
          url,
          data: qs.stringify(data)
        }).then(res => {
          let PFUNews = res.data;
          if (PFUNews.err == 0) {
            this.$message({
              message: "新闻添加成功",
              type: "success"
            });
          } else if (PFUNews.err == -1) {
            this.$message({
              message: "用户未登录",
              type: "warning"
            });
          } else if (PFUNews.err == -2) {
            this.$message.error("用户不存在");
          } else if (PFUNews.err == -3) {
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