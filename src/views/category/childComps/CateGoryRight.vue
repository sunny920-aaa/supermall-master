<template>
  <div class="CateGoryRight">
    <scroller class="scroller" ref="scroll">
      <div
        class="CateGoryRightInfo"
        v-for="(item, index) in CateGoryRight"
        :key="index"
      >
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imgLoad" />
          <div>{{ item.title }}</div>
        </a>
      </div>
    </scroller>
  </div>
</template>

<script>
import Scroller from "../../../components/common/scroller/Scroller.vue";
export default {
  name: "CateGoryRight",
  components: { Scroller },
  props: {
    CateGoryRight: {
      type: Array,
    },
  },
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    imgLoad() {
      this.$refs.scroll.scroll.refresh();
    },
  },
};
</script>

<style scoped >
.CateGoryRight {
  margin-top: 44px;
  margin-bottom: 40px;
  margin-left: 85px;
  height: 100vh;
}
.CateGoryRightInfo {
  margin-top: 10px;
  width: 49%;
  text-align: center;
  display: inline-block;
}
.CateGoryRightInfo img {
  width: 75%;
}
.scroller {
  height: calc(100% - 44px - 49px);
  overflow: hidden;
}
</style>
