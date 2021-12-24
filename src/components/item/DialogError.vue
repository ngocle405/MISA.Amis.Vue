<template>
  <div id="dlgDeletePopup" class="m-delete-modal" v-show="isError">
    <div class="m-message-box">
      <div class="m-message-content">
        <div class="m-message-icon">
          <div class="m-icon m-icon-exclaimation-warning icon-48"></div>
        </div>
        <span class="m-message-text">
          {{ textError }}
        </span>
      </div>
      <div class="m-mess-line"></div>
      <div class="m-message-footer">
        <div class="m-flex-space"></div>
        <button class="m-btn" @click="closeDialogError">Đồng ý</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isError: Boolean,
    textError: String,
  },
  methods: {
    /**
     * Gọi sang component cha để đóng thông báo
     * CreatedBy: Lê thanh ngọc (24/12/2021)
     */
    closeDialogError() {
      this.$emit("close-dialog");
    },
  },
};
</script>

<style>
</style>