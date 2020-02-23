<template>
  <div id="app">
    <header-component></header-component>
  </div>
</template>

<script>
import HeaderComponent from "./component/HeaderComponent";

export default {
  name: "app",
  components: {
    HeaderComponent
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
