<template>
  <div>
    <swiper class="DetailSwiper">
      <swiper-item v-for="item in DetailSwiper" :key="item.index">
        <img :src="item" alt="" />
      </swiper-item>
    </swiper>
  </div>
</template>
<script>
import Swiper from "../../../components/common/swiper/Swiper.vue";
import SwiperItem from "../../../components/common/swiper/SwiperItem.vue";

export default {
  components: { Swiper, SwiperItem },
  data() {
    return {};
  },
  props: {
    DetailSwiper: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>
<style>
.DetailSwiper {
  height: 300px;
}
</style>
