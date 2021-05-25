import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import mitt from "mitt";
import VueImageLazyload from 'vue-image-lazyload'
import axios from 'axios'
// import install from './network/axios.js'

const app = createApp(App);
app.config.globalProperties.$mybus = new mitt();
app.use(VueImageLazyload)
    // app.use(install)
app.config.globalProperties.$axios = axios

const isProd = process.env.NODE_ENV === "production";
if (!isProd) {
    createApp(App).config.devtools = true;
}
FastClick.attach(document.body)

//判断该路由是否需要登录权限
router.beforeEach((to, from, next) => {
    if (to.meta.needLogin) {
        if (localStorage.getItem('token')) {
            next()
        } else {
            next({
                name: 'Profile'
            })
        }
    } else {
        //表示不需要登录
        next();
    }

})

/* const app = createApp(App);
app.config.globalProperties.$mybus = bus */
createApp(App).use(store).use(router).mount('#app');