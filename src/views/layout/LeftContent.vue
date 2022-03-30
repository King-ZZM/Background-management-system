<template>
  <div class="left">
    <div class="logo">
      <img :src="imgURL" alt />
      <h3>外卖商家中心</h3>
    </div>
    <el-menu :default-active="path" router text-color="#fff" unique-opened >
      <template v-for="item in menu">
        <el-menu-item v-if="item.children.length === 1" :index="item.path"  :key="item.path">
          <template slot="title">
            <i class="iconfont" :class="item.meta.icon"></i>{{item.meta.title}}
          </template>
        </el-menu-item>

        <el-submenu v-else :index="item.path" :key="item.path">
          <template slot="title">
            <i class="iconfont" :class="item.meta.icon"></i>{{item.meta.title}}
          </template>
          <el-menu-item :index="children.path" v-for="children in item.children" :key="children.path">{{children.meta.title}}</el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>
<script>
// 引入Ajax函数
import { shopInfo } from "@/api/shop";
// 引入工具函数
import { shopPicURL, bus } from "@/utils/tool";
// 引入local
import local from "@/utils/local";

export default {
  data() {
    return {
      imgURL: "",
      menu: []
    };
  },
  computed: {
    path() {
      let path = this.$route.path;
      if (path === "/order/order-add") {
        return "/order/order-list";
      }
      if(path === '/home'){
        return '/'
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
    this.getData();
    bus.$on("shop-img", _ => {
      this.getData();
    });
    this.menu = local.get("menu");
    // console.log(this.menu);
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