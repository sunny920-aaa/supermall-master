<template>
  <div class="tabControl">
    <div
      class="tabControl_item"
      v-for="(item, index) in title"
      :key="item.id"
      :class="{ active: index === currentIndex }"
      @click="tabControlClick(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentIndex: 0,
    };
  },
  props: {
    title: {
      type: Array,
      defaule() {
        return [];
      },
    },
  },
  methods: {
    tabControlClick(index) {
      this.currentIndex = index;
      //子组件向父组件传
      this.$emit("controlClick", index);
      console.log(index);
    },
  },
};
</script>
<style>
.tabControl {
  display: flex;
  position: sticky;
  top: 44px;
  background-color: #eeeeee;
}
.tabControl_item {
  flex: 1;
  text-align: center;
  line-height: 30px;
  height: 30px;
  font-size: 15px;
}
.active {
  color: red;
}
.active span {
  border-bottom: 1px solid red;
}
</style>
