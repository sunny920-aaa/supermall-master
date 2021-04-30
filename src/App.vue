<template>
  <div id="app">
    <tar-bar-item></tar-bar-item>
    <router-view v-slot="{ Component }">
      <!-- 
        keep-alive 是 Vue 内置的一个组件，
        可以使被包含的组件保留状态，或避免重新渲染。
        如果不想要所有的状态都被保留，可以使用exclude排除掉，前提该组件需要设置name属性
       -->
      <keep-alive exclude="Detail">
        <component :is="Component" />
      </keep-alive>
    </router-view>

    <!-- <div class="tab_bar"></div> -->
  </div>
</template>

<script>
import TarBarItem from "components/common/tarbar/TarBarItem";

export default {
  name: "app",
  components: { TarBarItem },
};
</script>

<style>
@import "./assets/css/base.css";
</style>
