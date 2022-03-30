<template>
  <div class="right-header">
    <el-row>
      <el-col :span="12">
        <div class>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item
              v-for="item in headerTitle"
              :key="item.title"
              :to="{ path: item.path }"
              class="breadcrumb-item-color"
            >{{item.title}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </el-col>
      <el-col :span="12" class="el-col-right">
        <!-- 菜单项 -->
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link" >
            欢迎您 , {{name}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="personal">个人中心</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-avatar :size="50" :src="imgURL"></el-avatar>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import local from '@/utils/local'
// 引入ajax函数
import {userInfo} from '@/api/user'
// 引入bus
import { bus, baseURL } from '@/utils/tool'
// 导入计算路由
import {calcRouterMenu} from '@/router/index.js'

export default {
  data() {
    return {
      imgURL:require('@/assets/imgs/1.jpg'),
      name:'',
    };
  },
  methods: {
    // 点击执行菜单事件
    handleCommand(command){
      if(command === 'personal'){
        // 个人中心
        this.$router.push('/account/personal')
      }else if (command === 'logout'){
        // 退出登录
        local.clear()
        // calcRouterMenu()
        this.$router.push('/login')
        window.location.reload()
      }
    },
    // 获取用户数据
    getUserData(){
      // 加载用户头像
      userInfo().then( (res)=>{
       this.imgURL = res.accountInfo.imgUrl
       this.name = res.accountInfo.account;
      // 存储用户数据到本地
      local.set('info',res.accountInfo)
      })
    },
  },
  computed: {
    // 监测面包屑
    headerTitle() {
      let arr = [];
      this.$route.matched.map(v => {
        if (v.meta && v.meta.path) {
          arr.push(v.meta);
        }
      });
      return arr;
    },
  },
  created(){
    // 加载用户头像
    this.getUserData()
    bus.$on('user-update',()=>{
      this.getUserData()
    })
  }
};
</script>
<style lang="less" scoped>
.right-header {
  padding: 0 35px 0 20px;
  height: 50px;
  // width: 100%;
  .el-row {
    display: flex;
    align-items: center;
    height: 100%;
    .el-col-right {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .el-avatar {
        margin-left: 15px;
      }
    }
    /deep/ .breadcrumb-item-color .el-breadcrumb__inner {
      color: #606266;
    }
  }
}
</style>