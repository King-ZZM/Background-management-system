import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui';
// 引入local
import local from '@/utils/local'

// 引入css文件
import '@/assets/css/reset.css'
import '@/assets/fonts/iconfont.css'
import 'element-ui/lib/theme-chalk/index.css';

// 引入组件
import Layout from '../views/layout/Layout'
import Login from '../views/login/Login'


Vue.use(VueRouter)
Vue.use(ElementUI);


// 解决重复路由报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

// 配置路由路径
// 静态路由
const routes = [
  // 登录
  {
    path: '/login',
    component: Login,
    hide: true
  },
  // 首页
  {
    path: '/',
    redirect: '/home',
    meta: { path: '', title: '首页', icon:'icon-home' },
    component: Layout,
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/Home')
      }
    ]
  },

]

// 动态路由
const dynamicRouter = [
  // 订单管理
  {
    path: '/order/order-list',
    meta: { path: '/order/order-list', title: '订单管理', icon:'icon-order' },
    redirect: '/order/order-list',
    component: Layout,
    children: [
      // 订单列表
      {
        path: '/order/order-list',
        meta: { path: '/order/order-list', title: '订单列表' },
        component: () => import('@/views/order/OrderList')
      },
      // 添加订单
      {
        path: '/order/order-add',
        meta: { path: '/order/order-add', title: '添加订单' },
        component: () => import('@/views/order/OrderAdd'),
        hide:true
      }
    ]
  },
  // 商品管理
  {
    path: '/goods-list',
    meta: { path: '/goods-list', title: '商品管理', icon:'icon-shopping' },
    redirect: '/goods/goods-list',
    component: Layout,
    children: [
      // 商品列表
      {
        path: '/goods/goods-list',
        meta: { path: '/goods/goods-list', title: '商品列表' },
        component: () => import('@/views/goods/GoodsList')
      },
      // 商品添加
      {
        path: '/goods/goods-add',
        meta: { path: '/goods/goods-add', title: '商品添加' },
        component: () => import('@/views/goods/GoodsAdd')
      },
      // 商品分类
      {
        path: '/goods/goods-cate',
        meta: { path: '/goods/goods-cate', title: '商品分类' },
        component: () => import('@/views/goods/GoodsCate')
      },
    ]
  },
  // 店铺管理
  {
    path: '/shop',
    meta: { path: '/shop', title: '店铺管理', roles: ['super'], icon:'icon-shop' },
    component: Layout,
    children: [
      {
        path: '/shop',
        component: () => import('@/views/shop/Shop')
      }
    ]
  },
  // 账号管理
  {
    path: '/account-list',
    meta: { path: '/account/account-list', title: '账号管理', icon:'icon-account' },
    redirect: '/account/account-list',
    component: Layout,
    children: [
      // 账号列表
      {
        path: '/account/account-list',
        meta: { path: '/account/account-list', title: '账号列表', roles: ['super'] },
        component: () => import('@/views/account/AccountList')
      },
      // 添加账号
      {
        path: '/account/account-add',
        meta: { path: '/account/account-add', title: '添加账号', roles: ['super'] },
        component: () => import('@/views/account/AccountAdd')
      },
      // 修改密码
      {
        path: '/account/modify-password',
        meta: { path: '/account/modify-password', title: '修改密码' },
        component: () => import('@/views/account/ModifyPassword')
      },
      // 个人中心
      {
        path: '/account/personal',
        meta: { path: '/account/personal', title: '个人中心' },
        component: () => import('@/views/account/Personal')
      },
    ]
  },
  // 销售统计
  {
    path: '/goods-count',
    meta: { path: '/goods-count', title: '销售统计', roles: ['super'], icon:'icon-count' },
    redirect: '/count/goods-count',
    component: Layout,
    children: [
      // 商品统计
      {
        path: '/count/goods-count',
        meta: { path: '/count/goods-count', title: '商品统计' },
        component: () => import('@/views/count/GoodsCount')
      },
      // 订单统计
      {
        path: '/count/order-count',
        meta: { path: '/count/order-count', title: '订单统计' },
        component: () => import('@/views/count/OrderCount')
      },
    ]
  },
  // 配置错误跳转到404页面
  {
    path: '*',
    redirect: '/error404',
    hide: true
  },
  // 404页面
  {
    path: '/error404',
    component: () => import('@/views/error/Error404'),
    hide: true
  },
]

// 路由实例
const router = new VueRouter({
  routes
})

// 封装计算路由和计算菜单
export const calcRouterMenu = function (){

  // 计算路由权限
  let role = local.get('role')
  if(role){
    const calcRoute = (router) => {
      return router.filter(v => {
        if (v.meta && v.meta.roles && !v.meta.roles.includes(role)) {
          return false
        }
        if (v.children && v.children.length) {
          v.children = calcRoute(v.children)
        }
        return true
      })
    }
    
    // 追加通过的路由
    let arr = calcRoute(dynamicRouter)
    router.addRoutes(arr)
    
    // 计算菜单项
    let arrMenu = JSON.parse(JSON.stringify([...routes, ...arr]))
    const calcMenu = (routes) => {
      return routes.filter(v => {
        if (v.hide) {
          return false
        }
        if (v.children && v.children.length) {
          v.children = calcMenu(v.children)
        }
        return true
      })
    }
    let res = calcMenu(arrMenu)
    local.set('menu',res)
  }
}
calcRouterMenu()

// 导出计算路由和计算菜单


// 路由守卫
router.beforeEach((to, from, next) => {
  // console.log(to,from);
  let token = local.get('token')
  if (token || to.path === '/login') {
    next()
  } else {
    next('/login')
  }
})

export default router
