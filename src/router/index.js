import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

let routes = []

// 动态加载路由，遍历router文件夹中的所有js文件
const requireContext = require.context(
  './', // 查找文件夹的路径
  true, // 是否递归子目录
  /\.js$/ // 查找.js文件正则
)

requireContext.keys().forEach(filename => {
  if (filename === './index.js') return
  const routerModule = requireContext(filename)
  routes = [...routes, ...(routerModule.default || routerModule)]
})

const router = new VueRouter({
  routes
})

// 动态增加路由
router.addRoutes([
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
])

// 导航守卫
router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach((to, from) => {
  NProgress.done()
})

export default router
