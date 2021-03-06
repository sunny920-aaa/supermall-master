import { createRouter, createWebHistory } from 'vue-router'


const Home = () =>
    import ('views/home/Home')
const Category = () =>
    import ('views/category/Category')
const Cart = () =>
    import ('views/cart/Cart')
const Profile = () =>
    import ('views/profile/Profile')
const Detail = () =>
    import ('views/detail/Detail')

const routes = [{
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: "home",
        component: Home
    },
    {
        path: '/category',
        component: Category
    },
    {
        path: '/cart',
        component: Cart,
        meta: {
            needLogin: true //需要加校检判断的路由
        }
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile
    },
    {
        path: '/detail/:iid',
        component: Detail,

    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router