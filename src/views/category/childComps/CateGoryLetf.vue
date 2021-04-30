<template>
  <div class="category-left">
    <ul v-for="(item, index) in CateGoryLetf" :key="index">
      <li
        class="category-left-title"
        @click="categoryLeftClick(index)"
        :class="{ isClick: currentIndex == index }"
      >
        {{ item.title }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "CateGoryLetf",
  components: {},
  props: {
    CateGoryLetf: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
      maitKey: 0,
    };
  },
  methods: {
    categoryLeftClick(index) {
      this.currentIndex = index;
      this.maitKey = this.CateGoryLetf[index].maitKey;
      // console.log(this.maitKey);
      this.$emit("maitKey", this.maitKey);
      console.log(this.maitKey);
    },
  },
};
</script>

<style scoped >
.category-left {
  height: calc(100% - 44px - 49px);
  width: 25%;
  background-color: #f6f6f6;
  margin-top: 45px;
  margin-bottom: 38px;
  position: fixed;
  top: 0;
  overflow: auto;
}
.category-left-title {
  height: 50px;
  text-align: center;
  line-height: 46px;
  list-style-type: none;
}
.isClick {
  background-color: #ff8198;
}
</style>
