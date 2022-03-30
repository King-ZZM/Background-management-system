import Vue from "vue"

// 密码验证规则
export const checkPass = value =>{
    if(!value){
        return '密码不能为空'
    }
    let res = /^[a-zA-Z0-9_-]{3,16}$/.test(value)
    return res ? '': '密码不符合规范,密码长度3-16位,中英文、数字和-_'
}

// 公共bus
export const bus = new Vue()

// 获取图片名称
export const fileName = data =>{
    return data.split('/').pop()
}

// 服务器地址
export const baseURL = 'http://127.0.0.1:5000'

// 截取时间
export const getTime = data =>{
    let res =  data.split("T")[1]
    if( data.split("T")[1]){
        return data.split("T")[1].slice(0,8)
    }else {
        return  data.split("T")[1]
    }
}

// 店铺图片上传获取地址
export const shopPicURL = 'http://127.0.0.1:5000/upload/shop/'

// 格式化时间
export const formatDate = data =>{
    let date = new Date(data)
    let y = date.getFullYear()
    let m = (date.getMonth() + 1 )< 10 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1)
    let d = date.getDate() < 10 ? '0' + date.getDate()  : date.getDate() 
    let h = date.getHours() < 10 ? '0' + date.getHours()  : date.getHours() 
    let min = date.getMinutes() < 10 ? '0' + date.getMinutes()  : date.getMinutes() 
    let s = date.getSeconds() < 10 ? '0' + date.getSeconds()  : date.getSeconds() 
    return `${y}-${m}-${d} ${h}:${min}:${s}`
}