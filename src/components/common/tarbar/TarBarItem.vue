<template>
  <tar-bar>
    <div class="tab-bar-item" @click="itemClick(0)">
      <img
        v-if="active == 0"
        src="~assets/images/tabbar/home_active.svg"
        alt=""
      />
      <img v-else src="~assets/images/tabbar/home.svg" alt="" />
      <div>首页</div>
    </div>

    <div class="tab-bar-item" @click="itemClick(1)">
      <img
        v-if="active == 1"
        src="~assets/images/tabbar/category_active.svg"
        alt=""
      />
      <img v-else src="~assets/images/tabbar/category.svg" alt="" />

      <div>品类</div>
    </div>
    <div class="tab-bar-item" @click="itemClick(2)">
      <img
        v-if="active == 2"
        src="~assets/images/tabbar/shopcart_active.svg"
        alt=""
      />
      <img v-else src="~assets/images/tabbar/shopcart.svg" alt="" />

      <div>购物车</div>
    </div>
    <div class="tab-bar-item" @click="itemClick(3)">
      <img
        v-if="active == 3"
        src="~assets/images/tabbar/profile_active.svg"
        alt=""
      />
      <img v-else src="~assets/images/tabbar/profile.svg" alt="" />
      <div>我的</div>
    </div>
  </tar-bar>
</template>

<script>
import TarBar from "./TarBar";

export default {
  name: "TarBarItem",
  props: {
    // path: {
    //   type: String,
    // },
    // activeStyle: {
    //   type: String,
    //   default: "coral",
    // },
  },
  components: {
    TarBar,
  },
  data() {
    return {
      path: "/home",
      active: 0,
    };
  },
  methods: {
    itemClick(path) {
      this.active = path;
      if (path == 0) {
        this.$router.push({
          path: "/home",
        });
        this.path = "/home";
      } else if (path == 1) {
        this.$router.push({
          path: "/category",
        });
        this.path = "/category";
      } else if (path == 2) {
        this.$router.push({
          path: "/cart",
        });
        this.path = "/cart";
      } else {
        this.$router.push({
          path: "/profile",
        });
        this.path = "/profile";
      }
    },
  },
  computed: {
    /* isActive() {
      console.log(this.$route.path.indexOf(this.path));
      return this.$route.path.indexOf(this.path) !== -1;
    }, */
    /* isStyleActive(num) {
      return this.isActive ? { color: this.activeStyle } : {};
    }, */
  },
};
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
  color: black;
  z-index: 9999;
}

.tab-bar-item img {
  width: 24px;
  height: 24px;
  vertical-align: middle;
  margin: 4px 0 2px 0;
}

.actived {
  color: coral;
  font-weight: bolder;
}
</style>
