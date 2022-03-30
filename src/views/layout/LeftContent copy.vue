<template>
  <div class="left">
    <div class="logo">
      <img :src="imgURL" alt />
      <h3>外卖商家中心</h3>
    </div>
    <el-menu :default-active="path" router text-color="#fff">
      <el-menu-item index="/home">
        <template slot="title">
          <i class="iconfont icon-home"></i>后台首页
        </template>
      </el-menu-item>
      <el-menu-item index="/order/order-list">
        <template slot="title">
          <i class="iconfont icon-order"></i>订单管理
        </template>
      </el-menu-item>
      <el-submenu index="/goods/goods-list">
        <template slot="title">
          <i class="iconfont icon-shopping"></i>商品管理
        </template>
        <el-menu-item index="/goods/goods-list">商品列表</el-menu-item>
        <el-menu-item index="/goods/goods-add">商品添加</el-menu-item>
        <el-menu-item index="/goods/goods-cate">商品分类</el-menu-item>
      </el-submenu>
      <el-menu-item index="/shop">
        <template slot="title">
          <i class="iconfont icon-shop"></i>店铺管理
        </template>
      </el-menu-item>
      <el-submenu index="/account/account-list">
        <template slot="title">
          <i class="iconfont icon-account"></i>账号管理
        </template>
        <el-menu-item index="/account/account-list">账号列表</el-menu-item>
        <el-menu-item index="/account/account-add">添加账号</el-menu-item>
        <el-menu-item index="/account/modify-password">修改密码</el-menu-item>
        <el-menu-item index="/account/personal">个人中心</el-menu-item>
      </el-submenu>
      <el-submenu index="/count/goods-count">
        <template slot="title">
          <i class="iconfont icon-count"></i>销售统计
        </template>
        <el-menu-item index="/count/goods-count">商品统计</el-menu-item>
        <el-menu-item index="/count/order-count">订单统计</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
// 引入Ajax函数
import { shopInfo } from "@/api/shop";
// 引入工具函数
import { shopPicURL, bus } from "@/utils/tool";

export default {
  data() {
    return {
      imgURL: ""
    };
  },
  computed: {
    path() {
      let path = this.$route.path;
      if (path === "/order/order-add") {
        return "/order/order-list";
      }
      return path;
    }
  },
  methods: {
    async getData() {
      let res = await shopInfo().then(res => {
        this.imgURL = shopPicURL + res.data.avatar;
      });
    }
  },
  created() {
    this.getData()
    bus.$on('shop-img',(_)=>{
      this.getData()
    })
  }
};
</script>
<style lang="less" scoped>
.left {
  width: 200px;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #304156;
  .logo {
    display: flex;
    color: #fff;
    justify-content: center;
    align-items: center;
    img {
      margin: 5px 5px 0 0;
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    h3 {
      font-size: 18px;
    }
  }
  .el-menu {
    border-right: none;
  }
  .el-menu .el-menu-item {
    border: none;
    background-color: #304156;
  }
  .el-submenu .el-menu .el-menu-item {
    background-color: #202f3f;
    // color: #fff;
    &:hover {
      background-color: deeppink;
    }
  }
  .el-menu-item,
  /deep/ .el-submenu__title {
    background-color: #304156;
    &:hover {
      background-color: red;
    }
  }
  i.iconfont {
    margin: 0 10px;
    color: #fff;
  }
}
</style>