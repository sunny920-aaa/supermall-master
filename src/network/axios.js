import Vue from 'vue'
import axios from "axios";
import qs from 'qs'
// import urls from "../../static/js/api.js"

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

axios.defaults.timeout = 10000;
// const api = 'http://103.49.60.19:9501';
axios.defaults.baseURL = "http://127.0.0.1:3000";
// console.log(urls)




//http response 拦截器
// axios.interceptors.response.use(
//     response => {
//         console.log(response)
//         if (response.data.code == 4001) {
//             console.log(111)
//             $router.push({
//                 path: "/login",
//                 querry: { redirect: router.currentRoute.fullPath }//从哪个页面跳转
//             })

//         }
//         return response;
//     },
//     error => {
//         return Promise.reject(error)
//     }
// )


// 通过axios.defaults.timeout设置默认的请求超时时间。
/**
 * get方法，对应get请求
//  * @param {String} url [请求的url地址]
//  * @param {Object} params [请求时携带的参数]
 */

// export function post(url, params) {
//     return new Promise((resolve, reject) => {
//          axios.post(url, qs.stringify(params))
//         .then(res => {
//             resolve(res.data);
//         })
//         .catch(err =>{
//             reject(err.data)
//         })
//     });
// }
// 添加请求拦截器

let httpCode = {
        //这里我简单列出一些常见的http状态码信息，可以自己去调整配置
        400: '请求参数错误',
        401: '权限不足, 请重新登录',
        403: '服务器拒绝本次访问',
        404: '请求资源未找到',
        500: '内部服务器错误',
        501: '服务器不支持该请求中使用的方法',
        502: '网关错误',
        504: '网关超时'
    }
    /** 添加请求拦截器 **/
axios.interceptors.request.use(config => {
    let token = sessionStorage.getItem('gettoken') || '';
    if (token) {
        config.headers['token'] = token
    }
    // 发起请求时加载全局loading，请求失败或有响应时会关闭
    if (config.method === 'get') {
        // 添加时间戳参数，防止浏览器（IE）对get请求的缓存
        config.params = {
            ...config.params,
            t: new Date().getTime()
        }
        if (config.params.loadStatus) {

        } else {
            // Toast.loading({
            //     message: '加载中...',
            //     forbidClick: true,
            //     loadingType: 'spinner'
            // });
        }
    } else {

    }
    // 在这里：可以根据业务需求可以在发送请求之前做些什么:例如我这个是导出文件的接口，因为返回的是二进制流，所以需要设置请求响应类型为blob，就可以在此处设置。
    // if (config.url.includes('pur/contract/export')) {
    //     config.headers['responseType'] = 'blob'
    // }
    // 我这里是文件上传，发送的是二进制流，所以需要设置请求头的'Content-Type'
    // if (config.url.includes('/file/upload/img')) {
    //     config.headers['Content-Type'] = 'multipart/form-data;'
    // }
    return config
}, error => {
    // 对请求错误做些什么

    return Promise.reject(error)
})


// export default axios;

export default {
    install(app) {
        (app.get = (url, params, config = {}) => {
            return new Promise((resolve, reject) => {
                axios({
                    method: 'GET',
                    url,
                    params,
                    ...config
                }).then(res => {
                    resolve(res.data)
                }).catch(err => {
                    reject(err.response.data);
                    if (err.response.data.code == 401) {

                        if (this.$storageGet("xybyUserinfo")) {
                            this.$store.state.logined = false;
                            this.$storageRemove("loginedStatus");
                            this.$storageRemove("xybyUserinfo");
                            this.$router.push({ path: "/login" });
                        }
                    }
                })
            })

        }),


        (app.post = (url, data, config = {}) => {

            return new Promise((resolve, reject) => {
                axios({
                    method: 'POST',
                    url,
                    data,
                    ...config
                }).then(res => {
                    resolve(res.data)
                }).catch(error => {
                    reject(error)
                })
            })
        })
        // 保存到localstrange
        // (Vue.prototype.$storageSet = function(key, value) {
        //     // JSON.stringify(value)把对象转为字符串，storage不能保存对象
        //     localStorage.setItem(key, JSON.stringify(value));
        // }),
        // (Vue.prototype.$storageGet = function(key) {
        //     return JSON.parse(localStorage.getItem(key)); /**将字符转为对象 */
        // }),
        // (Vue.prototype.$storageRemove = function(key) {
        //     localStorage.removeItem(key); /**移除key **/
        // });
    }
};