<template>
  <div class="nar_bar">
    <div class="nar_bar_left"><slot name="left"></slot></div>
    <div class="nar_bar_center"><slot name="center"></slot></div>
    <div class="nar_bar_right"><slot name="right"></slot></div>
  </div>
</template>
<script>
export default {
  name: "NarBar",
};
</script>
<style scoped>
.nar_bar {
  display: flex;
  height: 44px;
}
.nar_bar_left,
.nar_bar_right {
  width: 60px;
}

.nar_bar_center {
  flex: 1;
}
</style>
