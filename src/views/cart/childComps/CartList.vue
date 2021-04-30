<template>
  <div id="cart_list">
    <scroller ref="scroll" class="cart_scroll">
      <template v-for="(item, index) in $store.state.CartList" :key="index">
        <cart-list-item :item="item"></cart-list-item>
      </template>
    </scroller>
  </div>
</template>
<script>
import Scroller from "../../../components/common/scroller/Scroller";
import CartListItem from "./CartListItem.vue";

export default {
  data() {
    return {};
  },
  components: {
    Scroller,
    CartListItem,
  },
  methods: {},
  activated() {
    this.$refs.scroll.scroll.refresh();
  },
};
</script>
<style scoped>
#cart_list {
  font-size: 0.68rem;
  height: calc(100vh - 1.9rem - 2.09rem - 1.9rem);
}
/**
* scroll
*/
.cart_scroll {
  height: 100%;
  overflow: hidden;
}
</style>