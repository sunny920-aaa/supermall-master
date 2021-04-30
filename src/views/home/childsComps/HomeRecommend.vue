<template>
  <div class="recommend">
    <div v-for="item in recommends" :key="item.id">
      <a :href="item.link">
        <img :src="item.image" alt="" />
        <div class="title">{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  name: "HomeRecommend",
  props: {
    recommends: {
      type: Object,
      default() {
        return Object;
      },
    },
  },

  data() {
    return {};
  },
};
</script>
<style>
.recommend {
  display: flex;
  width: 100%;
  text-align: center;
  font-size: 14px;
  padding: 8px 0;
  border-bottom: 10px solid #eee;
}
.recommend img {
  width: 90%;
}
</style>
