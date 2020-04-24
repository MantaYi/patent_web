<template>
  <div class="newsChange">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="新闻标题">
        <el-input v-model="form.newsHeadline"></el-input>
      </el-form-item>
      <el-form-item label="新闻内容">
        <el-input type="textarea" v-model="form.newsContent"></el-input>
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
      <el-form-item label="专利领域">
        <el-select v-model="form.newsArea" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="change">修改新闻</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
//引入axios的qs模块
import qs from "qs";

export default {
  name: "newsChange",
  data() {
    return {
      form: {
        newsId: "",
        newsHeadline: "",
        newsContent: "",
        newsDate: "",
        newsArea: ""
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
  created() {
    let data = JSON.parse(localStorage.getItem("newsChange"));
    this.form.newsId = data.newsId;
    this.form.newsHeadline = data.newsHeadline;
    this.form.newsContent = data.newsContent;
    this.form.newsDate = data.newsDate;
    this.form.newsArea = data.newsArea;
  },
  methods: {
    change() {
      if (
        this.form.newsId &&
        this.form.newsHeadline &&
        this.form.newsContent &&
        this.form.newsDate &&
        this.form.newsArea
      ) {
        let url = "http://localhost:3000/manage/newsChange";
        let token = localStorage.getItem("PFUToken");
        token = JSON.parse(token).token;
        let data = {
          token,
          newsId: this.form.newsId,
          newsHeadline: this.form.newsHeadline,
          newsContent: this.form.newsContent,
          newsDate: this.form.newsDate,
          newsArea: this.form.newsArea
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
.newsChange {
  width: 800px;
  min-height: 200px;
  margin: 0 auto;
}
</style>