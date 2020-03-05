<template>
  <div>
    <div class="fileNav">
      <router-link to="/file/upload">文件上传</router-link>
      <el-button-group>
        <el-dropdown>
          <el-button type="primary">
            按专利类型查找
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
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
          <el-dropdown-menu slot="dropdown">
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
      <i class="el-icon-search"></i>
    </div>
    <consult-component></consult-component>
    <file-component></file-component>
    <file-component></file-component>
    <file-component></file-component>
    <file-component></file-component>
    <el-pagination background layout="prev, pager, next" :total="100"></el-pagination>
  </div>
</template>
<script>
import FileComponent from "../../component/FileComponent";
import ConsultComponent from "../../component/consultComponent/ConsultComponent";

export default {
  name: "File",
  components: {
    FileComponent,
    ConsultComponent
  },
  data() {
    return {
      search: ""
    };
  }
};
</script>
<style lang="less" scoped>
.fileNav {
  width: 800px;
  height: 50px;
  margin: 0 auto;
  .el-button-group {
    .el-dropdown {
      margin: 0 10px;
    }
  }
  .el-input {
    margin-left: 100px;
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