import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import mitt from "mitt";
import VueImageLazyload from 'vue-image-lazyload'

const app = createApp(App);
app.config.globalProperties.$mybus = new mitt();
app.use(VueImageLazyload)

const isProd = process.env.NODE_ENV === "production";
if (!isProd) {
    createApp(App).config.devtools = true;
}
FastClick.attach(document.body)


/* const app = createApp(App);
app.config.globalProperties.$mybus = bus */
createApp(App).use(store).use(router).mount('#app');