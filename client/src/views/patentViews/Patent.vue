<template>
  <div>
    <div class="patentNav">
      <el-button-group>
        <el-dropdown>
          <el-button type="primary">
            按专利类型查找
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown" @click.native="getPatentByType">
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
          <el-dropdown-menu slot="dropdown" @click.native="getPatentByArea">
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
      <i class="el-icon-search" @click="getPatentByKeyword"></i>
    </div>
    <consult-component></consult-component>
    <patent-component
      v-for="(item,index) in patentList"
      :index="index"
      :key="item._id"
      :patentId="item._id"
      :patentName="item.patentName"
      :patentContent="item.patentContent"
      :patentApplicant="item.patentApplicant"
      :patentApplicantLocation="item.patentApplicantLocation"
      :patentFile="item.patentFile"
      :patentType="item.patentType"
      :patentArea="item.patentArea"
      :patentStatus="item.patentStatus"
      :patentApplyDate="item.patentApplyDate"
    ></patent-component>
    <el-pagination background layout="prev, pager, next" :total="100"></el-pagination>
  </div>
</template>
<script>
//引入axios的qs模块
import qs from "qs";

import PatentComponent from "../../component/PatentComponent";
import ConsultComponent from "../../component/consultComponent/ConsultComponent";

export default {
  name: "Patent",
  components: {
    PatentComponent,
    ConsultComponent
  },
  data() {
    return {
      patentList: [],
      search: ""
    };
  },
  created() {
    let url = "http://localhost:3000/patent/search";
    this.$http({
      method: "get",
      url
    }).then(res => {
      let PFUPatent = res.data;
      if (PFUPatent.err == 0) {
        this.$message({
          message: "查找专利成功",
          type: "success"
        });
        this.patentList = PFUPatent.data;
      } else {
        this.$message.error("服务器出错，请稍后再试");
      }
    });
  },
  methods: {
    getPatentByType() {
      let patentType = event.target.innerText;
      let data = {
        patentType
      };
      let url = "http://localhost:3000/patent/searchByType";
      this.$http({
        method: "post",
        url,
        data: qs.stringify(data)
      }).then(res => {
        let PFUPatent = res.data;
        if (PFUPatent.err == 0) {
          this.$message({
            message: "查找专利成功",
            type: "success"
          });
          this.patentList = PFUPatent.data;
        } else {
          this.$message.error("服务器出错，请稍后再试");
        }
      });
    },
    getPatentByArea() {
      let patentArea = event.target.innerText;
      let data = {
        patentArea
      };
      let url = "http://localhost:3000/patent/searchByArea";
      this.$http({
        method: "post",
        url,
        data: qs.stringify(data)
      }).then(res => {
        let PFUPatent = res.data;
        if (PFUPatent.err == 0) {
          this.$message({
            message: "查找专利成功",
            type: "success"
          });
          this.patentList = PFUPatent.data;
        } else {
          this.$message.error("服务器出错，请稍后再试");
        }
      });
    },
    getPatentByKeyword() {
      let keyword = this.search;
      let data = {
        keyword
      };
      let url = "http://localhost:3000/patent/searchByKeyword";
      this.$http({
        method: "post",
        url,
        data: qs.stringify(data)
      }).then(res => {
        let PFUPatent = res.data;
        if (PFUPatent.err == 0) {
          this.$message({
            message: "查找专利成功",
            type: "success"
          });
          this.patentList = PFUPatent.data;
        } else {
          this.$message.error("服务器出错，请稍后再试");
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.patentNav {
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