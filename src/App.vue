<template>
  <div class="m-container-fuild">
    <TheNavbar />
    <div class="m-container">
      <TheHeader />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

import TheNavbar from "./components/layout/TheNavbar.vue";
import TheHeader from "./components/layout/TheHeader.vue";
export default {
  name: 'App',
  components: {
    TheNavbar,
    TheHeader
  }
}
</script>

<style>
@import url("./style/shared/main.css");
@import url("./style/page/employee.css");
</style>
