<template>
  <div>
    <el-input v-model="id" placeholder="请输入用户Id"></el-input>
    <i class="el-icon-search" @click="getUserById"></i>
    <user-component
      v-for="item in userList"
      :key="item._id"
      :userId="item._id"
      :userName="item.userName"
      :password="item.password"
      :userEmail="item.userEmail"
      :userPhone="item.userPhone"
      :userType="item.userType"
      :userScore="item.userScore"
    ></user-component>
  </div>
</template>
<script>
//引入axios的qs模块
import qs from "qs";

import UserComponent from "../../component/manageComponent/UserComponent";

export default {
  name: "ManageUser",
  components: {
    UserComponent
  },
  data() {
    return {
      id: "",
      userList: []
    };
  },
  methods: {
    getUserById() {
      if (this.id) {
        let userId = this.id;
        let token = localStorage.getItem("PFUToken");
        token = JSON.parse(token).token;
        let data = {
          userId,
          token
        };
        let url = "http://localhost:3000/manage/userSearch";
        this.$http({
          method: "post",
          url,
          data: qs.stringify(data)
        }).then(res => {
          let PFUUser = res.data;
          if (PFUUser.err == 0) {
            this.$message({
              message: "查找用户成功",
              type: "success"
            });
            this.userList = PFUUser.data;
            localStorage.setItem(
              "manageKnowledge",
              JSON.stringify({
                userId: this.userList[0]._id
              })
            );
          } else if (PFUUser.err == -1) {
            this.$message({
              message: "用户未登录",
              type: "warning"
            });
          } else if (PFUUser.err == -2) {
            this.$message.error("登录的账户不存在");
          } else if (PFUUser.err == -3) {
            this.$message.error("用户权限不足");
          } else if (PFUUser.err == -4) {
            this.$message.error("用户不存在");
          } else {
            this.$message.error("服务器出错，请稍后再试");
          }
        });
      } else {
        this.$message({
          message: "Id不能为空",
          type: "warning"
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
.el-input {
  margin-left: 20px;
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
</style>