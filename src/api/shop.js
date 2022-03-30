// 店铺管理
// 引入ajax
import axios from '@/utils/axios'

// 获取店铺信息
export const shopInfo = () => {
    return axios({
        url:'/shop/info',
        method:'get'
    })
}

// 修改店铺头像
export const shopAvater = data =>{
    return axios({
        url:"/shop/upload",
        method:'post',
        data
    })
}

// 店铺内容修改
export const shopEdit = data =>{
    return axios({
        url:"/shop/edit",
        method:'post',
        data
    })
}