<template>
  <swiper>
    <swiper-item v-for="item in cbanners" :key="item.id">
      <a :href="item.link"
        ><img :src="item.image" alt="" @load="imageload"
      /></a>
    </swiper-item>
  </swiper>
</template>
<script>
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "HomeSwiper",
  props: {
    cbanners: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    Swiper,
    SwiperItem,
  },
  data() {
    return {
      isload: false,
    };
  },
  activated() {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    imageload() {
      // if (!this.isload) {
      this.$emit("SwiperImageLoad");
      //   this.isload = true;
      // }
    },
  },
};
</script>
<style>
img {
  width: 100%;
}
</style>
