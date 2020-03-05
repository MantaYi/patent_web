<template>
  <div>
    <user-component></user-component>
  </div>
</template>
<script>
import UserComponent from "../../component/manageComponent/UserComponent";

export default {
  name: "ManageUser",
  components: {
    UserComponent
  }
};
</script>