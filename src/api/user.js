// 用户模块
import axios from '@/utils/axios.js'

// 添加账号
export const addAccount = data =>{
    return axios({
        url:'/users/add',
        method:"POST",
        data
    })
}

// 登录
export const login = data =>{
    return axios({
        url:'/users/checkLogin',
        method:"POST",
        data
    })
}

// 修改密码
export const changePass = data =>{
    return axios({
        url:"/users/editpwd",
        method:'post',
        data
    })
}

// 账户列表
export const userList = params =>{
    return axios({
        url:"/users/list",
        method:'get',
        params
    })
}

// 修改账号
export const userEdit = data =>{
    return axios({
        url:"/users/edit",
        method:'post',
        data
    })
}

// 删除账号
export const userdel = params =>{
    return axios({
        url:"/users/del",
        method:'get',
        params
    })
}

// 批量删除账号
export const userdelMutil = params =>{
    return axios({
        url:"/users/batchdel",
        method:'get',
        params
    })
}

// 获取用户信息
export const userInfo = () =>{
    return axios({
        url:"/users/info",
        method:'get',
    })
}

// 修改用户头像
export const userPicUpload = params =>{
    return axios({
        url:"/users/avataredit",
        method:'get',
        params
    })
}

// 头像上传
export const userPicUpdate = data =>{
    return axios({
        url:"/users/avatar_upload",
        method:'post',
        data
    })
}