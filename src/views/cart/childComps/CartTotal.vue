<template>
  <div class="cart_total">
    <div @click="checkClick" class="cart_check_all">
      <cart-check-button :isChecked="isSelectAll" /><span>全选</span>
    </div>
    <div class="cart_price">价格:￥{{ checkAllPrice }}</div>
    <div class="settle" @click="AllClick">结算({{ checkLength }})</div>
  </div>
</template>
<script>
import CartCheckButton from "./CartCheckButton.vue";
export default {
  data() {
    return {
      state: true,
    };
  },
  components: {
    CartCheckButton,
  },
  computed: {
    cartList() {
      return this.$store.state.CartList;
    },
    //计算所有选中商品的价格
    checkAllPrice() {
      return this.cartList
        .filter((item) => {
          return item.checked;
        })
        .reduce((preValue, item) => {
          return preValue + item.lowNowPrice * item.count;
        }, 0);
    },
    //计算选中了几个商品
    checkLength() {
      return this.cartList.filter((item) => item.checked).length;
    },
    isSelectAll() {
      if (this.cartList.length === 0) {
        return false;
      } else {
        return this.cartList.every((item) => item.checked);
      }
    },
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        this.cartList.forEach((item) => (item.checked = false));
      } else {
        this.cartList.forEach((item) => (item.checked = true));
      }
    },
  },
};
</script>
<style scoped>
.cart_total {
  height: 2rem;

  background-color: #f8f7d7;
  position: fixed;
  bottom: 3rem;
  left: 0;
  right: 0;
  display: flex;
}
.cart_check_all {
  width: 6rem;
  display: flex;
  flex: 1;
  line-height: 2rem;
  margin-left: 1.1rem;
}
.cart_price {
  width: 8rem;
  text-align: center;
  line-height: 2rem;
}
.settle {
  width: 7rem;
  text-align: center;
  line-height: 2rem;
  background-color: pink;
}
</style>