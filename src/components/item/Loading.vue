<template>
   <div class="loading" v-show="isLoading">
    <div class="loading-icon"></div>
    <div class="dialog-background"></div>
  </div>
</template>

<script>
export default {
 props:{
        isLoading:Boolean
    },
    setup() {},
}
</script>

<style scoped>


</style>