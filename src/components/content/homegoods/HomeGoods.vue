<template>
  <div class="good-list">
    <home-goods-item
      v-for="item in HomeGoods"
      :key="item.index"
      :HomeGoodsItem="item"
    ></home-goods-item>
  </div>
</template>
<script>
import HomeGoodsItem from "./HomeGoodsItem";

export default {
  name: "HomeGoods",
  components: {
    HomeGoodsItem,
  },
  data() {
    return {};
  },
  props: {
    HomeGoods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  mounted() {
    console.log(this.HomeGoods);
  },
};
</script>
<style scoped>
.good-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  background-color: var(--color-background);

  padding: 2px;
}
</style>
