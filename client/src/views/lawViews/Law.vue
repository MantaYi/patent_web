<template>
  <div>
    <div class="lawNav">
      <el-button-group>
        <el-dropdown>
          <el-button type="primary">
            按专利类型查找
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown" @click.native="getLawByType">
            <el-dropdown-item>发明专利</el-dropdown-item>
            <el-dropdown-item>实用新型专利</el-dropdown-item>
            <el-dropdown-item>外观设计专利</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown>
          <el-button type="primary">
            按专利领域查找
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown" @click.native="getLawByArea">
            <el-dropdown-item>人类生活需要</el-dropdown-item>
            <el-dropdown-item>作业运输</el-dropdown-item>
            <el-dropdown-item>化学冶金</el-dropdown-item>
            <el-dropdown-item>纺织造纸</el-dropdown-item>
            <el-dropdown-item>固定建筑物</el-dropdown-item>
            <el-dropdown-item>机械工程</el-dropdown-item>
            <el-dropdown-item>物理</el-dropdown-item>
            <el-dropdown-item>电学</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-button-group>
      <el-input v-model="search" placeholder="请输入关键词"></el-input>
      <i class="el-icon-search" @click="getLawByKeyword"></i>
    </div>
    <consult-component></consult-component>
    <law-component
      v-for="item in lawList"
      :key="item._id"
      :lawId="item._id"
      :lawFrom="item.lawFrom"
      :lawContent="item.lawContent"
      :lawPatentType="item.lawPatentType"
      :lawArea="item.lawArea"
    ></law-component>
  </div>
</template>
<script>
//引入axios的qs模块
import qs from "qs";

import LawComponent from "../../component/LawComponent";
import ConsultComponent from "../../component/consultComponent/ConsultComponent";

export default {
  name: "Law",
  components: {
    LawComponent,
    ConsultComponent
  },
  data() {
    return {
      search: "",
      lawList: []
    };
  },
  created() {
    let url = "http://localhost:3000/law/search";
    this.$http({
      method: "get",
      url
    }).then(res => {
      let PFULaw = res.data;
      if (PFULaw.err == 0) {
        this.$message({
          message: "查找法规成功",
          type: "success"
        });
        this.lawList = PFULaw.data;
      } else if (PFULaw.err == -1) {
        this.$message({
          message: "无相关法规",
          type: "warning"
        });
      } else {
        this.$message.error("服务器出错，请稍后再试");
      }
    });
  },
  methods: {
    getLawByType() {
      let lawPatentType = event.target.innerText;
      let data = {
        lawPatentType
      };
      let url = "http://localhost:3000/law/searchByType";
      this.$http({
        method: "post",
        url,
        data: qs.stringify(data)
      }).then(res => {
        let PFULaw = res.data;
        if (PFULaw.err == 0) {
          this.$message({
            message: "查找法规成功",
            type: "success"
          });
          this.lawList = PFULaw.data;
        } else if (PFULaw.err == -1) {
          this.$message({
            message: "无相关法规",
            type: "warning"
          });
        } else {
          this.$message.error("服务器出错，请稍后再试");
        }
      });
    },
    getLawByArea() {
      let lawArea = event.target.innerText;
      let data = {
        lawArea
      };
      let url = "http://localhost:3000/law/searchByArea";
      this.$http({
        method: "post",
        url,
        data: qs.stringify(data)
      }).then(res => {
        let PFULaw = res.data;
        if (PFULaw.err == 0) {
          this.$message({
            message: "查找法规成功",
            type: "success"
          });
          this.lawList = PFULaw.data;
        } else if (PFULaw.err == -1) {
          this.$message({
            message: "无相关法规",
            type: "warning"
          });
        } else {
          this.$message.error("服务器出错，请稍后再试");
        }
      });
    },
    getLawByKeyword() {
      let data = {
        keyword: this.search
      };
      let url = "http://localhost:3000/law/searchByKeyword";
      this.$http({
        method: "post",
        url,
        data: qs.stringify(data)
      }).then(res => {
        let PFULaw = res.data;
        if (PFULaw.err == 0) {
          this.$message({
            message: "查找法规成功",
            type: "success"
          });
          this.lawList = PFULaw.data;
        } else if (PFULaw.err == -1) {
          this.$message({
            message: "无相关法规",
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
.lawNav {
  width: 800px;
  height: 50px;
  margin: 0 auto;
  .el-button-group {
    .el-dropdown {
      margin: 0 10px;
    }
  }
  .el-input {
    margin-left: 150px;
    display: inline-block;
    width: 200px;
  }
  .el-icon-search {
    width: 60px;
    height: 40px;
    background-color: #003472;
    color: #fff;
    text-align: center;
    line-height: 40px;
    border-radius: 6px;
    cursor: pointer;
  }
}
</style>