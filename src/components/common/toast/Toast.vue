<template>
  <div class="toast" v-show="isshow">
    {{ content }}
  </div>
</template>

<script>
export default {
  name: "Toast",
  components: {},
  props: {
    isshow: false,
    content: "",
  },
};
</script>

<style scoped >
.toast {
  background-color: black;
  position: fixed;
  top: 50%;
  left: 50%;
}
</style>
