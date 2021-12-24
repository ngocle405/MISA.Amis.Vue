<template>
  <div id="dlgDeletePopup" class="m-delete-modal" v-show="confirmDelete">
    <div class="m-message-box">
      <div class="m-message-content">
        <div class="m-message-icon">
          <div class="m-icon m-icon-exclaimation-warning icon-48"></div>
        </div>
        <span class="m-message-text">
          Bạn có thực sự muốn xóa Nhân viên
          <span>{{ employeeCodeDelete }}</span> không?
        </span>
      </div>
      <div class="m-mess-line"></div>
      <div class="m-message-footer">
        <button class="m-second-btn" v-on:click="cancelDetele">Không</button>
        <div class="m-flex-space"></div>
        <button class="m-btn" @click="deleteEmployee">Có</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  props: {
    confirmDelete: Boolean,
    employeeCodeDelete: String,
  },
  methods: {
    /**
     * Gọi sang component cha để Huỷ xác nhận xoá bản ghi
     * CreatedBy:  Lê thanh ngọc (20/12/2021)
     */
    cancelDetele() {
      this.$emit("cancel-Detele");
    },
    /**
     * Gọi sang component cha, xác nhận đồng ý xoá bản ghi
     * CreatedBy: Lê thanh ngọc (23/12/2021)
     */
    deleteEmployee() {
      this.$emit("delete-Employee");
    },
  },
};
</script>

<style>
</style>