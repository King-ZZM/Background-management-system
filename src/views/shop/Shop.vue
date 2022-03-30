<template>
  <Panel name="店铺管理">
    <el-button
      slot="btn"
      style="float: right; padding: 3px 0;width:70px;height:35px"
      type="primary"
      @click="save"
    >保存</el-button>
    <el-form label-width="80px" :model="form">
      <el-form-item label="店铺管理">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="店铺公告">
        <el-input v-model="form.bulletin"></el-input>
      </el-form-item>
      <el-form-item label="店铺头像">
        <el-upload
          class="avatar-uploader-info"
          :action="baseURL + '/shop/upload'"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="form.avatar" :src="form.avatar" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="店铺图片">
        <el-upload
          class="avatar-uploader"
          :action="baseURL + '/shop/upload'"
          :file-list="fileList"
          list-type="picture-card"
          :on-preview="handlePreview"
          :on-success="handlePicSuccess"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="配送费">
        <el-input-number v-model="form.deliveryPrice" :min="1"></el-input-number>
      </el-form-item>
      <el-form-item label="配送时间">
        <el-input-number v-model="form.deliveryTime" :min="1"></el-input-number>
      </el-form-item>
      <el-form-item label="配送描述">
        <el-select v-model="form.description">
          <el-option value="蜂鸟专送"></el-option>
          <el-option value="美团跑腿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="店铺评分">
        <el-rate
          v-model="form.score"
          disabled
          show-score
          text-color="#ff9900"
          score-template="{value}"
        ></el-rate>
      </el-form-item>
      <el-form-item label="活动">
        <el-checkbox-group v-model="form.supports">
          <el-checkbox label="在线支付满28减5" name="type"></el-checkbox>
          <el-checkbox label="VC无限橙果汁全场8折" name="type"></el-checkbox>
          <el-checkbox label="单人精彩套餐" name="type"></el-checkbox>
          <el-checkbox label="特价饮品8折抢购" name="type"></el-checkbox>
          <el-checkbox label="单人特色套餐" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="配送费">
        <el-time-picker
          is-range
          v-model="form.date"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
        ></el-time-picker>
      </el-form-item>
    </el-form>
  </Panel>
</template>
<script>
// 引入面板
import Panel from "@/components/Panel";
// 引入Ajax函数
import { shopInfo, shopEdit} from '@/api/shop'
// 引入服务器地址
import {baseURL, fileName, shopPicURL, bus } from '@/utils/tool'

export default {
  // 注册
  components: { Panel },
  data() {
    return {
      form: {
          supports:[],
      },
      fileList: [],
      baseURL,
    };
  },
  methods: {
    // 店铺头像上传成功的钩子
    handleAvatarSuccess(e) {
        this.form.avatar = shopPicURL + e.imgUrl
        console.log(this.form.avatar);
    },
    // 店铺头像上传之前的钩子
    beforeAvatarUpload() {},
    // 文件列表移除文件时的钩子
    handlePreview() {},
    // 店铺图片上传成功的钩子
    handlePicSuccess(e){
        this.fileList.push({
            name:e,
            url: shopPicURL + e.imgUrl
        })
    },
    // 点击文件列表中已上传的文件时的钩子
    handleRemove(e) {
        this.fileList = this.fileList.filter(v=>{
            return v.uid !== e.uid
        })
    },
    // 获取店铺数据
    async getData(){
        let res = await shopInfo()
        // console.log(res);
        res.data.avatar = shopPicURL + res.data.avatar
         res.data.pics.map(v=>{
             this.fileList.push({
                 name:v,
                 url: shopPicURL + v
             })
         })
        this.form = res.data
    },
    // 保存按钮
    async save(){
        let avatar  = fileName(this.form.avatar)
        // console.log(avatar);
        let pics = this.fileList.map(v=>{
            return fileName(v.url)
        })
        // console.log(pics);
        // console.log(this.fileList);
        let res = await shopEdit({
            ...this.form,
            avatar,
            pics:JSON.stringify(pics),
            supports:JSON.stringify(this.form.supports),
            date:JSON.stringify(this.form.date)
        })
        // console.log(res);
        bus.$emit('shop-img')
    }
  },
  created(){
      this.getData()
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
}
.avatar-uploader-info {
  width: 100px;
  height: 100px;
  display: inline-block;
  border: 1px dashed #c0ccda;
}
.avatar {
    width: 100px;
    height: 100%;
}
/deep/ .el-upload--picture-card,
/deep/.el-upload-list__item {
  position: relative;
  width: 100px;
  height: 100px;
}
/deep/ .el-upload--picture-card {
  line-height: 100px;
}
</style>