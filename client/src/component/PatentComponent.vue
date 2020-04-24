<template>
  <router-link to="/patent/details" @click="details">
    <div class="patent">
      <div>
        <span>专利名称：{{patentName}}</span>
        <span>专利类型：{{patentType}}</span>
        <span>专利领域：{{patentArea}}</span>
      </div>
      <div class="content">
        <p>专利内容：{{patentContent}}</p>
        <span></span>
      </div>
      <div>
        <span>专利申请人：{{patentApplicant}}</span>
        <span>申请日：{{patentApplyDateZh}}</span>
      </div>
      <div :id="statusId" class="status">
        <span>申请成功</span>
      </div>
    </div>
  </router-link>
</template>
<script>
export default {
  name: "PatentComponent",
  props: {
    index: Number,
    patentId: String,
    patentName: String,
    patentContent: String,
    patentApplicant: String,
    patentApplicantLocation: String,
    patentFile: String,
    patentType: String,
    patentArea: String,
    patentStatus: Number,
    patentApplyDate: String
  },
  computed: {
    statusId() {
      return `status${this.index}`;
    },
    patentApplyDateZh() {
      return this.patentApplyDate.substr(0, 10);
    }
  },
  mounted() {
    let status = document.getElementById(`${this.statusId}`);
    if (this.patentStatus == 0) {
      status.style.backgroundColor = "#FFB61E";
      status.innerHTML = `<span>已受理</span>`;
    } else if (this.patentStatus == 1) {
      status.style.backgroundColor = "#FFB61E";
      status.innerHTML = `<span>初审中</span>`;
    } else if (this.patentStatus == 2) {
      status.style.backgroundColor = "#FFB61E";
      status.innerHTML = `<span>公开</span>`;
    } else if (this.patentStatus == 3) {
      status.style.backgroundColor = "#FFB61E";
      status.innerHTML = `<span>实审中</span>`;
    } else if (this.patentStatus == 4) {
      status.style.backgroundColor = "#16A951";
      status.innerHTML = `<span>有权</span>`;
    } else {
      status.style.backgroundColor = "#C32136";
      status.innerHTML = `<span>无权</span>`;
    }
  },
  methods: {
    details() {
      // localStorage.setItem("patentId", this.patentId);
      // this.$router.push({ name: "/patent/details" });
    }
  }
};
</script>
<style lang="less" scoped>
a {
  color: #000;
}
.patent {
  width: 800px;
  height: 300px;
  margin: 0 auto;
  border-radius: 4px;
  border: 2px solid #003472;
  padding: 20px 20px 0 20px;
  margin-bottom: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  div {
    &:first-of-type {
      span {
        display: inline-block;
        width: 200px;
      }
    }
    &:nth-child(3) {
      span {
        display: inline-block;
        width: 350px;
        &:last-of-type {
          text-align: right;
        }
      }
    }
  }
  .content {
    height: 210px;
  }
  .status {
    width: 200px;
    height: 30px;
    line-height: 30px;
    position: relative;
    transform: rotate(30deg);
    background-color: #16a951;
    text-align: center;
    right: -600px;
    top: -250px;
  }
}
</style>