<template>
  <div class="login">
    <div>
      <input
        type="text"
        placeholder="请输入账号"
        class="username"
        v-model="userInfo.username"
      />
    </div>
    <div>
      <input
        type="password"
        placeholder="请输入密码"
        class="password"
        v-model="userInfo.password"
      />
    </div>
    <div class="aaa">
      <input
        type="text"
        placeholder="请输入验证码"
        class="verify"
        v-model="userInfo.Randcode"
      />
      <identify
        :identifyCode="identifyCode"
        @click="changeCode"
        class="identify"
      ></identify>
    </div>
    <div v-show="isshow" class="err">{{ loginErr[Errstatus] }}</div>
    <button class="btn" @click="login">登录</button>

    <div class="help">
      <span class="forgetPS">忘记密码？</span>
      <span class="regist" @click="goregist">快速注册</span>
    </div>
  </div>
</template>

<script>
import identify from "components/common/identify/identify.vue";
import { postLoginUser, postRegisterUser } from "network/useroperate";
import storage from "common/const";
export default {
  name: "login",
  components: {
    identify
  },
  props: {},
  data() {
    return {
      msg: "Welcome to Your Vue.js App商品库存编辑记录",
      passWord: "123456",
      // 验证码初始值
      identifyCode: "1234",
      // 验证码的随机取值范围
      identifyCodes: "1234567890",

      userInfo: {
        username: "",
        password: "",
        Randcode: ""
      },
      Errstatus: 0,
      loginErr: ["您输入的有误", "密码有误请重新输入", "验证码错误"],
      isshow: false
    };
  },
  computed: {},
  created() {},
  mounted() {
    let data = this.passWord;
    console.log(data); // e10adc3949ba59abbe56e057f20f883e
    // 刷新页面就生成随机验证码
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
  },
  methods: {
    changeCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    // 生成一个随机整数  randomNum(0, 10) 0 到 10 的随机整数， 包含 0 和 10
    randomNum(min, max) {
      max = max + 1;
      return Math.floor(Math.random() * (max - min) + min);
    },
    // 随机生成验证码字符串
    makeCode(data, len) {
      for (let i = 0; i < len; i++) {
        this.identifyCode += data[this.randomNum(0, data.length - 1)];
      }
    },
    //去注册
    goregist() {
      this.$emit("goregist", false);
    },
    login() {
      if (
        !this.userInfo.username ||
        !this.userInfo.password ||
        !this.userInfo.Randcode
      ) {
        this.isshow = true;
        this.Errstatus = 0;
      } else if (this.userInfo.Randcode != this.identifyCode) {
        this.isshow = true;
        this.Errstatus = 2;
      } else {
        this.isshow = false;
        0;
        postLoginUser(this.userInfo).then(res => {
          const token = res.token;
          storage.set("token", token);
          this.$router.go(-1);
        });
      }
    }
  }
};
</script>
<style scoped>
.login {
  width: 100%;
  position: fixed;
  top: 160px;
  left: 0;
}

.username {
  height: 40px;
  width: 96%;
  background-color: #ffffff;
  margin-top: 15px;
  margin-left: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.password {
  height: 40px;
  width: 96%;
  background-color: #ffffff;
  margin-top: 15px;
  margin-left: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.aaa {
  display: flex;
  align-items: center;
}

.verify {
  height: 40px;
  width: 60%;
  background-color: #ffffff;
  margin-top: 10px;
  margin-left: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.identify {
  display: inline-block;
  margin-left: 5px;
  margin-top: 12px;
}
.err {
  text-align: center;
  color: red;
  font-size: 14px;
  z-index: 99;
}

.btn {
  height: 40px;
  width: 96%;
  background-color: #2c8fcd;
  margin-top: 40px;
  margin-left: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  color: white;
  text-align: center;
  line-height: 40px;
}

.help {
  width: 96%;
  margin-top: 20px;
}

.forgetPS {
  float: left;
  margin-left: 8px;
  font-size: 13px;
}

.regist {
  float: right;
  font-size: 13px;
}
</style>