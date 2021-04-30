<template>
  <div class="HomeGoodsItem" @click="showDetail">
    <img
      :src="HomeGoodsItem.image || HomeGoodsItem.show.img"
      alt=""
      class="HomeGoodsItemImg"
      @load="imageItemload"
    />
    <p>&nbsp;&nbsp;{{ HomeGoodsItem.title }}</p>
    <span class="omeGoodsItemPrice">单价:{{ HomeGoodsItem.price }}</span>
    <span class="HomeGoodsItemCfav">{{ HomeGoodsItem.cfav }}人收藏</span>
  </div>
</template>
<script>
import mybus from "../../../bus";
export default {
  name: "HomeGoodsItem",
  components: {
    mybus,
  },
  props: {
    HomeGoodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    imageItemload() {
      mybus.emit("imageItemload");
    },
    showDetail() {
      this.$router.push("/detail/" + this.HomeGoodsItem.iid);
    },
  },
  mounted() {},
};
</script>
<style>
.HomeGoodsItem {
  width: 49%;
  height: 50%;
  display: inline-block;
  overflow: hidden;
  padding-left: 4px;
  padding-top: 4px;
}
img {
  border-radius: 5px;
}
p {
  font-size: 14px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.omeGoodsItemPrice {
  text-align: center;
  font-size: 13px;
  margin-top: 5px;
  display: block;
  color: red;
}
.HomeGoodsItemCfav {
  font-size: 12px;
  color: black;
}
</style>
