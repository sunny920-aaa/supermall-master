<template>
  <div id="NarBar">
    <nar-bar class="DetailNarBar">
      <template v-slot:left
        ><div class="DetailNarBar-left" @click="goBack">&lt;</div></template
      >
      <template v-slot:center
        ><div class="title">
          <div
            v-for="(item, index) in titles"
            :key="item.index"
            class="titles"
            @click="titleIndex(index)"
            :class="{ active: index === currentIndex }"
          >
            {{ item }}
          </div>
        </div></template
      >
    </nar-bar>
    <scroller
      class="scroller"
      ref="scroll"
      :probe-type="3"
      @scroll="contentscroll"
    >
      <div>
        <ul v-for="item in $store.state.CartList" :key="item.index">
          <li>{{ item }}</li>
        </ul>
      </div>
      <detail-swiper :DetailSwiper="detailSwiper"></detail-swiper>
      <detail-content :goods="Detailgoods"></detail-content>
      <detail-shop :DetailShop="DetailShop"></detail-shop>
      <detail-goods-info :detailInfo="DetailInfo"></detail-goods-info>
      <detail-params ref="params" :paramInfo="paramInfo"></detail-params>
      <detail-comment ref="comment" :comment="comment"></detail-comment>
      <home-goods
        ref="goods"
        :HomeGoods="goodsList"
        @imageItemload="loadImgEvent"
      ></home-goods>
    </scroller>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top @click="backClick" v-show="isshow"></back-top>
    <toast :isshow="istoastshow" :content="content"></toast>
  </div>
</template>
<script>
import NarBar from "../../components/common/narbar/NarBar.vue";
import Scroller from "../../components/common/scroller/Scroller.vue";
import HomeGoods from "../../components/content/homegoods/HomeGoods";
import {
  getdetail,
  Goods,
  shop,
  GoodsParam,
  goodsList,
} from "../../network/detail";
import DetailComment from "./childComps/DetailComment.vue";
import DetailContent from "./childComps/DetailContent.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import mybus from "../../bus";
import DetailParams from "./childComps/DetailParams.vue";
import DetailShop from "./childComps/DetailShop.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBottomBar from "./childComps/DetailBottomBar.vue";
import BackTop from "../../components/content/backtop/BackTop.vue";
import Toast from "../../components/common/toast/Toast.vue";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
      detailSwiper: [],
      Detailgoods: {},
      DetailShop: {},
      DetailInfo: {},
      paramInfo: {},
      comment: {},
      goodsList: [],
      themTopY: [],
      isshow: false,
      istoastshow: false,
      content: "",
    };
  },
  components: {
    NarBar,
    getdetail,
    Goods,
    shop,
    GoodsParam,
    DetailSwiper,
    DetailContent,
    DetailShop,
    Scroller,
    DetailGoodsInfo,
    DetailParams,
    DetailComment,
    goodsList,
    HomeGoods,
    mybus,
    DetailBottomBar,
    BackTop,
    Toast,
  },
  mounted() {
    /* mybus.on(('imageItemload')=>{}) */
  },
  created() {
    this.iid = this.$route.params.iid;

    this.getdetail();
  },
  methods: {
    loadImgEvent() {
      console.log(111);
    },

    goBack() {
      this.$router.go(-1);
    },
    titleIndex(index) {
      this.currentIndex = index;
      this.$refs.scroll.scroll.scrollTo(0, -this.themTopY[index]);
    },
    //详情页的轮播图
    getdetail() {
      getdetail(this.iid).then((res) => {
        const data = res.result;
        this.detailSwiper = data.itemInfo.topImages;
        //商品信息
        this.Detailgoods = new Goods(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        );
        console.log(this.Detailgoods);
        //商家信息
        this.DetailShop = new shop(data.shopInfo);

        //商品信息
        this.DetailInfo = data.detailInfo;

        //商品参数
        this.paramInfo = new GoodsParam(
          data.itemParams.info,
          data.itemParams.rule
        );
        if (data.rate.cRate != 0) {
          this.comment = data.rate.list[0];
        }
      });

      goodsList().then((res) => {
        this.goodsList = res.data.list;
      });
    },
    backClick() {
      this.$refs.scroll.scroll.scrollTo(0, 0);
    },
    contentscroll(position) {
      this.isshow = position.y < -1000;
    },
    addToCart() {
      let Cart = {};
      (Cart.images = this.detailSwiper[0]),
        (Cart.title = this.Detailgoods.desc);
      Cart.lowNowPrice = this.Detailgoods.lowNowPrice;
      Cart.iid = this.iid;

      this.$store.dispatch("addCart", Cart).then((res) => {
        // this.$toast.show(res, 2000);
        (this.istoastshow = true), (this.content = res);
        setTimeout(() => {
          this.istoastshow = false;
          this.content = "";
        }, 2000);
      });
    },
  },
};
</script>
<style scoped>
#NarBar {
  position: relative;
  z-index: 9;
  background-color: #ffffff;
  height: 100vh;
}
.DetailNarBar {
  background-color: #eeeeee;
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
}
.DetailNarBar-left {
  color: black;
  font-size: 30px;
  text-align: center;
  line-height: 44px;
  font-weight: 100;
}
.title {
  display: flex;
}
.titles {
  flex: 1;
  text-align: center;
  line-height: 44px;
}
.active {
  color: pink;
}
.scroller {
  height: 90%;
  overflow: hidden;
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 30px;
}
</style>
