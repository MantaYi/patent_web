<template>
  <div id="app">
    <HeaderComponent></HeaderComponent>
    <p>
      <router-link to="/consult">Consult</router-link>
    </p>
    <router-view></router-view>
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
