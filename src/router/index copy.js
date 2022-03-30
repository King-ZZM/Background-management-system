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
const routes = [
  // 登录
  {
    path: '/login',
    component: Login
  },
  // 首页
  {
    path: '/',
    redirect: '/home',
    meta: { path: '', title: '首页' },
    component: Layout,
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/Home')
      }
    ]
  },
  // 账号管理
  {
    path: '/account-list',
    meta: { path: '/account/account-list', title: '账号管理' },
    redirect: '/account/account-list',
    component: Layout,
    children: [
      // 账号列表
      {
        path: '/account/account-list',
        meta: { path: '/account/account-list', title: '账号列表', rules:['super']  },
        component: () => import('@/views/account/AccountList')
      },
      // 添加账号
      {
        path: '/account/account-add',
        meta: { path: '/account/account-add', title: '添加账号', rules:['super']  },
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
    meta: { path: '/goods-count', title: '销售统计', rules:['super']  },
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
  // 商品管理
  {
    path: '/goods-list',
    meta: { path: '/goods-list', title: '商品管理' },
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
  // 订单管理
  {
    path: '/order',
    meta: { path: '/order', title: '订单管理' },
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
        component: () => import('@/views/order/OrderAdd')
      }
    ]
  },
  // 店铺管理
  {
    path: '/shop',
    meta: { path: '/shop', title: '店铺管理', rules:['super'] },
    component: Layout,
    children: [
      {
        path: '/shop',
        component: () => import('@/views/shop/Shop')
      }
    ]
  },
]

// 

// 路由实例
const router = new VueRouter({
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // console.log(to,from);
  let token = local.get('token')
  if(token || to.path === '/login'){
    next()
  }else{
    next('/login')
  }
})

export default router
