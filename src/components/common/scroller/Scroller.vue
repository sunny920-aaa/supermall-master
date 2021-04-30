<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import Bscroll from "better-scroll";
export default {
  data() {
    return {
      scroll: null,
    };
  },
  props: {
    probeType: {
      Type: Number,
      default: 0,
    },
    pullUpLoad: {
      Type: Boolean,
      default: false,
    },
  },

  mounted() {
    //创建scroll的对象
    this.scroll = new Bscroll(this.$refs.wrapper, {
      click: true,
      //probeType 有4个值， 分别是 0，1，2 ，3  其中0，1代表了不进行侦测，2和3代表了侦测，
      //当probeType：2时，在手指滚动的过程中侦测，手指离开后的惯性滚动过程中不侦测
      //当probeType：3时，只要是滚动都进行侦测
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
    });
    //监听scroll的位置,传到父组件里面处理
    this.scroll.on("scroll", (position) => {
      this.$emit("scroll", position);
    });
    //监听上拉事件,传到父组件里面处理
    this.scroll.on("pullingUp", () => {
      this.$emit("pullingUp");
    });
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroller.scrollTo(0, 0, time);
    },
  },
};
</script>
<style>
</style>
