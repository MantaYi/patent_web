<template>
  <div class="home">
    <consult-component></consult-component>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple why">
          <p>为什么要申请专利？</p>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple answer">
          <div class="answers p1">
            <div>
              <p>独占专利！</p>
              <br />
              <p>只要申请专利成功，</p>
              <p>该专利就具有独占性，只有你才拥有！</p>
            </div>
          </div>
          <div class="answers p2">
            <div>
              <p>资产获取！</p>
              <br />
              <p>专利申请成功之后，</p>
              <p>专利可以通过授权使用</p>
              <p>以及转让等途径获取资产！</p>
            </div>
          </div>
          <div class="answers p3">
            <div>
              <p>提升价值！</p>
              <br />
              <p>通过申请专利，</p>
              <p>可以提升企业或者个人价值！</p>
            </div>
          </div>
          <div class="answers p4">
            <div>More...</div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark invent">
          <span>如何申请一个发明型专利？</span>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple invent-apply">
          <p>1.准备相关文件</p>
          <p>需要准备哪些文件？</p>
          <p>1） 请求书：包括发明专利的名称、发明人或设计人的姓名、申请人的姓名和名称、地址等。</p>
          <p>2） 说明书：包括发明专利的名称、所属技术领域、背景技术、发明内容、附图说明和具体实施方式。</p>
          <p>3） 权利要求书：说明发明的技术特征，清楚、简要地表述请求保护的内容。</p>
          <p>4） 说明书附图：发明专利常有附图，如果仅用文字就足以清楚、完整地描述技术方案的，可以没有附图。</p>
          <p>2.进行申请</p>
          <p>需要做什么？</p>
          <p>1）上传相关文件</p>
          <p>2）填写申请信息</p>
          <p>3.等待申请结果</p>
          <p>在家等专利申请结果吧！</p>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light invent-web">
          <p>1.联系专利专家</p>
          <p>为什么要专利专家？</p>
          <p>1）使得申请材料更加专业！</p>
          <p>2）对申请材料进行补强！</p>
          <p>3）大大提高申请通过概率！</p>
          <p>2.提交相关材料到国家知识产权局</p>
          <p>3.实时追踪申请进行并提供反馈</p>
          <p>4.获取相关证书并帮你邮递到家</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ConsultComponent from "../component/ConsultComponent";

export default {
  name: "Home",
  components: {
    ConsultComponent
  }
};
</script>

<style lang="less" scoped>
@import "./Home.vue.less";
</style>