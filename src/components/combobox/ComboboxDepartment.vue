<template>
  <div class="scombobox">
    <input
      type="text"
      id=""
      class="s-combobox-input"
      v-model="departmentName"
      :class="{
        'm-input-error': $v.departmentName.$error,
      }"
      @blur="$v.departmentName.$touch()"
      :title="$v.departmentName.$error ? titleDepartmentNameIsNull : null"
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
 import Resource from "../../js/Resource";
import { required } from "vuelidate/lib/validators";
export default {
  props: {
    options: Array,
  // titleDepartmentNameIsNull: String,
    departmentName: String,
  },
  data() {
    return {
      isShow: false,
      titleDepartmentNameIsNull: Resource["VN"].Warning.DepartmentIsEmpty,
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
    //   showText(id) {
    //   for (let i = 0; i < this.options.length; i++) {
    //     if (id == this.options[i].departmentId)
    //       return this.options[i].departmentName;
    //   }
    //   return "";
    // },
  },
   validations: {
    departmentName: {
      required,
    },
  },
};
</script>

<style>
</style>