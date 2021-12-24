<template>
   <div class="scombobox">
    <input
      type="text"
      id=""
      class="s-combobox-input"
     :value="showText(value)"
    />
    <div @click="showData" class="s-combobox-buton">
      <i class="fas fa-sort-down"></i>
    </div>
    <div class="s-combobox-data" v-show="isShow">
      <div
        class="s-combobox-item"
      
        v-for="(option, index) in options"
        :key="index"
        @click="select(option)"
      >
        {{ option.departmentName }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: Array,
    value: String,
  },
    data() {
    return {
      Department: [],
      isShow: false,
    };
  },
   methods: {
    /**
     * Hiện cbb department
     * Author: NVChien (9/12/2021)
     */
    showData() {
      this.isShow = !this.isShow;
    },
    /**
     * lấy ra dữ liệu và gọi lên cha
     * Author: NVChien (9/12/2021)
     */
    select(option) {
      this.isShow = !this.isShow;
      this.$emit("select", option);
    },
      showText(id) {
      for (let i = 0; i < this.options.length; i++) {
        if (id == this.options[i].departmentId)
          return this.options[i].departmentName;
      }
      return "";
    },
  },
}
</script>

<style>

</style>