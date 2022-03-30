<template>
  <Panel name="商品添加">
    <el-form :model="form" ref="form" label-width="80px">
      <el-form-item label="商品名称">
        <el-input v-model="form.name" placeholder="商品名称" class="input"></el-input>
      </el-form-item>
      <el-form-item label="商品分类">
        <el-select v-model="form.category" placeholder="请选择商品分类">
          <el-option :value="item.cateName"  v-for="item in categories" :key="item.cateName">{{item.cateName}}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品价格">
        <el-input-number v-model="form.price" :min="0"></el-input-number>
      </el-form-item>
      <el-form-item label="商品图片">
        <el-upload
          class="avatar-uploader"
          :action="baseURL + '/goods/goods_img_upload'"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imgUrl" :src="imgUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="商品描述">
        <el-input type="textarea" v-model="form.goodsDesc" rows="4" class="input"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addCate">添加商品</el-button>
      </el-form-item>
    </el-form>
  </Panel>
</template>
<script>
// 引入面板
import Panel from "@/components/Panel";
// 引入服务器地址
import { baseURL } from "@/utils/tool";
// 引入Ajax函数
import { addGoods, GoodsCategories } from "@/api/goods";

export default {
  data() {
    return {
      imgUrl: "",
      baseURL,
      form: {price: 0},
      categories:[],
    };
  },
  // 注册
  components: { Panel },
  methods: {
    // 上传成功钩子
    handleAvatarSuccess(res, file) {
      console.log(res, file);
      this.imgUrl = baseURL + res.imgUrl;
    },
    // 上传文件之前的钩子
    beforeAvatarUpload() {},
    // 点击按钮上传头像
    async upload() {
      await userPicUpload({ imgUrl: fileName(this.imgUrl) });
      bus.$emit("user-update");
    },
    // 添加商品
    addCate() {
      console.log(111);
      addGoods({
        ...this.form,
        imgUrl: this.imgUrl
      }).then(res => {
        console.log(res);
      });
    },
    // 查询所有分类名称
    queryCate() {
      GoodsCategories().then(res => {
        this.categories = res.categories
      });
    }
  },
  created() {
    this.queryCate();
  }
};
</script>
<style lang="less" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  border: 1px dashed #eee;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
.input {
  width: 450px;
}
</style>