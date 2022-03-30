// 订单管理
import axios from '@/utils/axios'

// 订单列表
export const orderList = params =>{
    return axios({
        url:'/order/list',
        method:'get',
        params
    })
}

// 查询订单
export const orderSearch = params =>{
    return axios({
        url:'/order/search',
        method:'get',
        params
    })
}

// 首页数据统计
export const orderData = () => {
    return axios({
        url:'/order/totaldata',
        method:'get',
    })
}

// 获取订单数据
export const orderTotal = params =>{
    return axios({
        url:"/order/ordertotal",
        method:'get',
        params
    })
}