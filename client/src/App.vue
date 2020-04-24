<template>
  <div id="app">
    <header-component></header-component>
    <router-view></router-view>
    <footer-component></footer-component>
  </div>
</template>
<script>
import HeaderComponent from "./component/HeaderComponent";
import FooterComponent from "./component/FooterComponent";

export default {
  name: "App",
  components: {
    HeaderComponent,
    FooterComponent
  }
};
</script>
<style>
#app {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html,
body {
  width: 100%;
  height: 100%;
  background-color: #f4f5f7;
}
ul {
  list-style: none;
}
a {
  text-decoration: none;
}
img {
  vertical-align: top;
  border: none;
}
.clear:after,
.clear:before {
  content: "";
  display: block;
  clear: both;
}
</style>
