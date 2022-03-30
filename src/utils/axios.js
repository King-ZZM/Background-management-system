import axios from 'axios'

// 引入存储
import local from './local'
// 引入Message
import { Message } from 'element-ui'

// 配置服务器地址
axios.defaults.baseURL = 'http://127.0.0.1:5000';


// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // console.log(config);
  // 配置token
  let token = local.get('token')
  if(token){
    config.headers.Authorization = token
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // console.log(response);
  let {data} =response
  if(data.code === 1 |  data.code === 5001){
    Message.error(data.msg)
    return new Promise(()=>{})
  }else if (data.code ===0){
    Message({
      type:'success',
      message:data.msg
    })
  }else if(data.code === 401){
    Message.error('请先登录')
    this.$router.push('/login')
  }


  return data;
}, function (error) {
  // 对响应错误做点什么
  if(data.code === 401){
    Message.error('请先登录')
    this.$router.push('/login')
  }
  return Promise.reject(error);
});

export default axios