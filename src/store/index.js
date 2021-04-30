import Vuex from 'vuex'


const ADD_TO_CART = 'add_to_cart';
const ADD_TO_COUNTER = 'add_to_counter';
export default Vuex.createStore({
    state: {
        CartList: []
    },
    mutations: {
        [ADD_TO_CART](state, payload) {
            state.CartList.push(payload);
        },
        [ADD_TO_COUNTER](state, payload) {
            payload.count += 1
        }
    },
    actions: {
        addCart({ state, commit }, payload) {
            // return new Promise((resolve, resject) => {
            //     let oldproduct = state.CartList.find(item => item.iid === payload.iid)
            //     if (oldproduct) {
            //         oldproduct.count += 1
            //         resolve('当前的商品数量+1')
            //     } else {
            //         payload.count = 1
            //         payload.checked = true
            //         state.CartList.push(payload)
            //         resolve('添加新的商品')
            //     }
            // })

            return new Promise((resolve, reject) => {
                //1.查找之前数组中是否含有该商品
                let product = state.CartList.find((item) => item.iid === payload.iid);

                //2. 判断product,这里涉及深拷贝与浅拷贝
                if (product) {
                    commit(ADD_TO_COUNTER, product);
                    resolve('成功添加购物车num+1');
                } else {
                    payload.count = 1;
                    payload.checked = true;
                    commit(ADD_TO_CART, payload);
                    resolve('成功添加购物车');
                }
            })



        }
    },

    modules: {}
})