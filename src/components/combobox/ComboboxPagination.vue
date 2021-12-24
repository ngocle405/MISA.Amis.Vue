<template>
  <div class="record-per-page" style="display: flex; align-items: center">
    <div class="m-custom-combobox bottom-combobox" id="cbxPaging">
      <input
        class="m-combobox m-combobox-input"
        type="text"
        readonly="true"
        v-model="itemSelected"
      />
      <button
        class="m-combobox-btn combobox-dropdown-btn"
        @click="isShow = !isShow"
      >
        <div class="m-icon icon-16 m-icon-arrow-down"></div>
      </button>

      <div class="m-combobox-data" v-show="isShow">
        <div
          v-for="(item, index) in ListItem"
          :key="index"
          class="m-combobox-item"
          @click="handleClickItem(item, index)"
        >
          <div class="combobox-item-text">{{ item }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
    };
  },
  props: {
    ListItem: Array,
  },
  created() {
    this.itemSelected = this.ListItem[0];
  },
  methods: {
    handleClickItem(item, index) {
      this.itemSelected = item;
      this.isShow = false;
      let pageRecord = 10;
      if (index == 0) pageRecord = 10;
      else if (index == 1) pageRecord = 20;
      else if (index == 2) pageRecord = 30;
      else if (index == 3) pageRecord = 50;
      else if (index == 4) pageRecord = 100;
      this.$emit("handleSelect", pageRecord);
    },
  },
};
</script>

<style>
</style>