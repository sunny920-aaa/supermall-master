<template>
  <div class="profile">
    <nar-bar class="narbar">
      <template v-slot:center><div>购物街</div></template>
    </nar-bar>
    <scroller class="scroll" ref="scroll">
      <profile-img></profile-img>

      <login @goregist="goregist" v-if="Status"></login>
      <regist @gologin="gologin" v-else></regist>
    </scroller>
  </div>
</template>

<script>
import Scroller from "components/common/scroller/Scroller";
import NarBar from "../../components/common/narbar/NarBar";
import ProfileImg from "./childscomps/ProfileImg";
import login from "./childscomps/login";
import regist from "./childscomps/regist";
export default {
  data() {
    return {
      scroll: null,
      Status: false,
      Errstatus: 0,
      registErr: [
        "您输入的有误",
        "您的账号已经注册",
        "密码有误请重新输入",
        "验证码错误"
      ]
    };
  },
  components: {
    Scroller,
    NarBar,
    ProfileImg,
    login,
    regist
  },
  methods: {
    gologin(a) {
      this.Status = a;
    },
    goregist(b) {
      this.Status = b;
    }
  }
};
</script>

<style>
.profile {
  height: 100vh;
}
.scroll {
  background-color: #f0f0f0;
  height: calc(100% - 44px - 50px);
}
.narbar {
  text-align: center;
  color: white;
  line-height: 44px;
  width: 100%;
  background-color: tomato;
  position: relative;
  top: 0;
  z-index: 99;
}
</style>