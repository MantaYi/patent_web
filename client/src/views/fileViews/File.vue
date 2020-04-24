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
          <el-dropdown-menu slot="dropdown" @click.native="getFileByType">
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
          <el-dropdown-menu slot="dropdown" @click.native="getFileByArea">
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
    </div>
    <consult-component></consult-component>
    <file-component
      v-for="item in fileList"
      :key="item._id"
      :fileId="item._id"
      :fileName="item.fileName"
      :filePath="item.filePath"
      :fileOwner="item.fileOwner"
      :filePrice="item.filePrice"
      :fileArea="item.fileArea"
      :filePatentType="item.filePatentType"
      :filePurchaseTimes="item.filePurchaseTimes"
      :fileDownloadTimes="item.fileDownloadTimes"
      :fileInformTimes="item.fileInformTimes"
    ></file-component>
  </div>
</template>
<script>
//引入axios的qs模块
import qs from "qs";

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
      search: "",
      fileList: []
    };
  },
  created() {
    let url = "http://localhost:3000/file/search";
    this.$http({
      method: "get",
      url
    }).then(res => {
      let PFUFile = res.data;
      if (PFUFile.err == 0) {
        this.$message({
          message: "查找文件成功",
          type: "success"
        });
        this.fileList = PFUFile.data;
      } else if (PFUFile.err == -1) {
        this.$message({
          message: "无文件",
          type: "warning"
        });
      } else {
        this.$message.error("服务器出错，请稍后再试");
      }
    });
  },
  methods: {
    getFileByType() {
      let filePatentType = event.target.innerText;
      let data = {
        filePatentType
      };
      let url = "http://localhost:3000/file/searchByType";
      this.$http({
        method: "post",
        url,
        data: qs.stringify(data)
      }).then(res => {
        let PFUFile = res.data;
        if (PFUFile.err == 0) {
          this.$message({
            message: "查找文件成功",
            type: "success"
          });
          this.fileList = PFUFile.data;
        } else if (PFUFile.err == -1) {
          this.$message({
            message: "无文件",
            type: "warning"
          });
        } else {
          this.$message.error("服务器出错，请稍后再试");
        }
      });
    },
    getFileByArea() {
      let fileArea = event.target.innerText;
      let data = {
        fileArea
      };
      let url = "http://localhost:3000/file/searchByArea";
      this.$http({
        method: "post",
        url,
        data: qs.stringify(data)
      }).then(res => {
        let PFUFile = res.data;
        if (PFUFile.err == 0) {
          this.$message({
            message: "查找文件成功",
            type: "success"
          });
          this.fileList = PFUFile.data;
        } else if (PFUFile.err == -1) {
          this.$message({
            message: "无文件",
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
.fileNav {
  width: 800px;
  height: 50px;
  margin: 0 auto;
  .el-button-group {
    .el-dropdown {
      margin: 0 10px;
    }
  }
}
</style>