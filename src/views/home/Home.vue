<template >
  <div class="home">
    <nar-bar class="nar_bar">
      <template v-slot:center><div>购物街</div></template>
    </nar-bar>
    <tab-control
      :title="TabControl"
      @controlClick="controlClick"
      ref="tabControl1"
      class="tab-control"
      v-show="istabcontrol"
    ></tab-control>
    <scroller
      class="contents"
      ref="scroll"
      :probe-type="3"
      @scroll="contentscroll"
      :pull-up-load="true"
      @pulling-up="loadmore"
    >
      <home-swiper
        :cbanners="banners"
        @SwiperImageLoad="SwiperImageLoad"
      ></home-swiper>
      <home-recommend :recommends="recommends"></home-recommend>
      <feature-view />
      <tab-control
        :title="TabControl"
        @controlClick="controlClick"
        ref="tabControl2"
      ></tab-control>
      <home-goods :HomeGoods="goods[currentIndex].list"></home-goods>
    </scroller>
    <back-top @click="backClick" v-show="isshow" />
  </div>
</template>

<script>
import NarBar from "components/common/narbar/NarBar.vue";
import { getHomeMultidata, getHomeGoods } from "network/home";
import Scroller from "../../components/common/scroller/Scroller";
import mybus from "../../bus";
import HomeSwiper from "./childsComps/HomeSwiper";
import HomeRecommend from "./childsComps/HomeRecommend";
import FeatureView from "./childsComps/FeatureView.vue";
import HomeGoods from "../../components/content/homegoods/HomeGoods";
import BackTop from "../../components/content/backtop/BackTop";
import TabControl from "../../components/content/tabControl/TabControl.vue";

export default {
  name: "home",
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      TabControl: ["流行", "新款", "精选"],
      tabControlOffSetTop: 0,
      currentIndex: "pop",
      scroll: null,
      isshow: false,
      istabcontrol: false,
      saveY: 0,
    };
  },
  components: {
    NarBar,

    getHomeMultidata,
    getHomeGoods,
    HomeGoods,

    HomeSwiper,
    HomeRecommend,
    FeatureView,
    TabControl,
    BackTop,
    Scroller,
  },
  //创建的时候请求3次数据：
  created() {
    this.getHomeData();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    /*     mybus.on("imageItemload", () => {
      this.$refs.scroll.scroll.refresh();
    }); */
  },

  methods: {
    getHomeData() {
      getHomeMultidata().then((res) => {
        console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      let page = this.goods[type].page + 1;
      console.log(page);
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        this.$refs.scroll.scroll.finishPullUp();
      });
    },
    controlClick(index) {
      console.log(this.goods);
      switch (index) {
        case 0:
          this.currentIndex = "pop";
          break;
        case 1:
          this.currentIndex = "new";
          break;
        case 2:
          this.currentIndex = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
    },
    backClick() {
      this.$refs.scroll.scroll.scrollTo(0, 0);
    },
    contentscroll(position) {
      /*       console.log(position); */
      this.isshow = position.y < -1000;
      this.istabcontrol = position.y < -this.tabControlOffSetTop;
      this.save = position.y;
    },
    loadmore() {
      this.getHomeGoods(this.currentIndex);
      //调用refresh重新计算可以滚动的区域
      this.$refs.scroll.scroll.refresh();
    },
    /**
     *轮播图加载比较慢,显示的tabControl的高度不准确
     *  */
    //监听轮播图完了之后打印tabControl的位置
    SwiperImageLoad() {
      this.tabControlOffSetTop = this.$refs.tabControl2.$el.offsetTop;
    },
  },
  computed: {},

  deactivated() {
    //切换路由的时候将scroll的Y获取到储存起来
    this.saveY = this.$refs.scroll.scroll.y;
    console.log(this.saveY);
    this.$refs.scroll.scroll.refresh();

    /*     // 通过给 $off第二参数传递一个函数，可以让其只销毁home里的事件，而不会销毁detail里的事件
    mybus.off("imageItemload", this.bcFunc);
    console.log("销毁Home的bus"); */
  },
  activated() {
    //回来的时候直接过去
    this.$refs.scroll.scroll.scrollTo(0, this.saveY);
    this.$refs.scroll.scroll.refresh();
    console.log(this.$refs.scroll.scroll.y);

    /*     mybus.on("imageItemload", this.bcFunc); */
  },
};
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
}
.contents {
  position: absolute;
  top: 44px;
  bottom: 49px;
  overflow: hidden;
}

.nar_bar {
  text-align: center;
  color: white;
  line-height: 44px;
  background-color: tomato;
}
.tab-control {
  position: fixed;
  top: 44px;
  right: 0;
  left: 0;
  z-index: 9;
}

/* .wrapper {
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow: hidden;
} */
</style>