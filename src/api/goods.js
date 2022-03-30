// 商品分类
// 引入ajax
import axios from '@/utils/axios'

// 获取分类
export const getCate = params =>{
    return axios({
        url:'/goods/catelist',
        method:'get',
        params
    })
}

// 修改分类
export const editCate = data =>{
    return axios({
        url:'/goods/editcate',
        method:'post',
        data
    })
}

// 删除分类
export const delCate = params =>{
    return axios({
        url:'/goods/delcate',
        method:'get',
        params
    })
}

// 添加分类
export const addCate = data =>{
    return axios({
        url:'/goods/addcate',
        method:'post',
        data
    })
}

// 添加商品
export const addGoods = data =>{
    return axios({
        url:'/goods/add',
        method:'post',
        data
    })
}

// 查询所有分类名称
export const GoodsCategories = () =>{
    return axios({
        url:'/goods/categories',
        method:'get',
    })
}

// 获取商品列表
export const GoodsList = params =>{
    return axios({
        url:'/goods/list',
        method:'get',
        params
    })
}

// 删除商品
export const orderDel = params =>{
    return axios({
        url:'/goods/del',
        method:'get',
        params
    })
}