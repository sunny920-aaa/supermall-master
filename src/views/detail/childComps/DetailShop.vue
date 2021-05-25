<template>
  <div>
    <div class="DetailShop">
      <img :src="DetailShop.logo" alt="" />
      <span>{{ DetailShop.name }}</span>
    </div>
    <div>
      <div class="sells">
        <div>
          <span class="sellsSum">{{ DetailShop.sells }}</span>
        </div>
        <span class="sellsSum1">总销量</span>
      </div>

      <div class="goods">
        <div>
          <span class="goods1">{{ DetailShop.goods }}</span>
        </div>
        <span class="goods2">全部宝贝</span>
      </div>
      <div class="DetailShopScore">
        <div v-for="item in DetailShop.score" :key="item.index">
          <span class="DetailShopName">
            {{ item.name }}
          </span>
          <span
            class="DetailGrade"
            :style="{ color: item.isBetter ? 'red' : 'green' }"
            >{{ item.score }}</span
          >
          <span
            :style="{
              backgroundColor: item.isBetter ? 'red' : 'green'
            }"
            class="DetailIsBetter"
            >{{ item.isBetter ? "高" : "低" }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailShop",
  components: {},
  props: {
    DetailShop: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    betterScore(isBetter) {
      /*  if(isBetter){
        return ''
      } */
    }
  },
  data() {
    return {
      score: 0
    };
  },
  methods: {
    score() {
      this.score = scroll;
      console.log(this.score);
    }
  }
};
</script>

<style scoped >
.DetailShop {
  height: 90px;
}
.DetailShop img {
  display: inline-block;
  width: 80px;
  height: 80px;
  border-radius: 90px;
  margin-left: 10px;
  border: 1px solid black;
}
.DetailShop span {
  position: relative;
  bottom: 40px;
  left: 15px;
}
.sells {
  display: inline-block;

  position: relative;
  top: 15px;
  left: 36px;
}
.sellsSum {
  font-size: 18px;
  font-weight: 700;
}
.sellsSum1 {
  padding-left: 6px;
  font-size: 14px;
}

.goods {
  display: inline-block;
  position: relative;
  top: 15px;
  left: 53px;
  padding-right: 15px;
  border-right: 1px solid pink;
}
.goods1 {
  font-size: 18px;
  padding-left: 10px;
  font-weight: 700;
}
.goods2 {
  font-size: 14px;
}
.DetailShopScore {
  position: relative;
  left: 200px;
  bottom: 30px;
}
.DetailShopName {
  font-size: 14px;
}
.DetailGrade {
  font-size: 12px;
  padding-left: 20px;
  color: green;
}
.DetailIsBetter {
  color: white;
  margin-left: 25px;
}
</style>
