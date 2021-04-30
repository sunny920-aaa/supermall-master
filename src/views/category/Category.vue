<template>
  <div>
    <nar-bar class="Category-narbar">
      <template v-slot:center>分类</template>
    </nar-bar>

    <div class="CategoryContent">
      <cate-gory-letf
        :CateGoryLetf="CateGoryLetf"
        @maitKey="maitKeys"
        class="CateGoryLetf"
      ></cate-gory-letf>

      <cate-gory-right
        :CateGoryRight="CateGoryRight"
        class="CateGoryRight"
      ></cate-gory-right>
    </div>
  </div>
</template>

<script>
import NarBar from "../../components/common/narbar/NarBar.vue";

import { CateGory, getCategoryInfo } from "../../network/category";
import CateGoryLetf from "./childComps/CateGoryLetf.vue";
import CateGoryRight from "./childComps/CateGoryRight.vue";
export default {
  data() {
    return {
      CateGoryLetf: [],
      maitKey: 0,
      CateGoryRight: [],
    };
  },
  components: {
    NarBar,
    CateGory,
    CateGoryLetf,
    CateGoryRight,
    getCategoryInfo,
  },
  created() {
    this.CateGoryLetfList();
    // console.log(this.maitKey);
    // this.CategoryInfo();
  },
  mounted() {
    // console.log(this.maitKey);
    // this.CategoryInfo();
  },
  computed: {},
  methods: {
    CateGoryLetfList() {
      CateGory().then((res) => {
        this.CateGoryLetf = res.data.category.list;
        this.maitKey = res.data.category.list[0].maitKey;
        // console.log(this.maitKey);
        this.CategoryInfo(this.maitKey);
      });
    },
    CategoryInfo(maitKey) {
      getCategoryInfo(maitKey).then((res) => {
        this.CateGoryRight = res.data.list;
        console.log(this.CateGoryRight);
      });
    },
    maitKeys(maitKey) {
      this.maitKey = maitKey;
      this.CategoryInfo(this.maitKey);
    },
  },
};
</script>

<style>
.Category-narbar {
  text-align: center;
  line-height: 44px;
  background-color: #ff8198;
  color: white;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 999;
}
.CategoryContent {
  display: flex;
  flex: 1;
}
.CateGoryLetf {
  width: 25%;
}
.CateGoryRight {
  width: 75%;
}
</style>