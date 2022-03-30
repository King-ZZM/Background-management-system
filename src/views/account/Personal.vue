<template>
  <Panel name="个人中心">
    <p>管理员信息</p>
    <el-divider></el-divider>
    <p>管理员ID : {{userData.id}}</p>
    <el-divider></el-divider>
    <p>账号 : {{userData.account}}</p>
    <el-divider></el-divider>
    <p>用户组 : {{userData.userGroup}}</p>
    <el-divider></el-divider>
    <p>创建时间 : {{userData.ctime.split('T')[0]}}</p>
    <el-divider></el-divider>
    <p>
      管理员头像 :
      <el-upload
        class="avatar-uploader"
        :action="baseURL + '/users/avatar_upload'"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="userData.imgUrl" :src="userData.imgUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <el-button type="primary" @click="upload">上传</el-button>
    </p>
  </Panel>
</template>
<script>
// 引入面板
import Panel from "@/components/Panel";
// 引入local
import local from "@/utils/local";
// 引入ajax函数
import { userPicUpload } from "@/api/user";
// 引入工具函数
import { bus, fileName, baseURL } from "@/utils/tool";

export default {
  data() {
    return {
      userData: {},
      baseURL
    };
  },
  methods: {
    // 文件上传成功后的钩子
    handleAvatarSuccess(res, file) {
      // this.userData.imageUrl = baseURL + res.imgUrl;
      this.userData.imgUrl = baseURL + res.imgUrl;
    },
    // 上传文件之前的钩子
    beforeAvatarUpload() {},
    // 点击按钮上传头像
    async upload() {
      await userPicUpload({ imgUrl: fileName(this.userData.imgUrl) });
      bus.$emit("user-update");
    }
  },
  components: { Panel },
  created() {
    this.userData = local.get("info");
    this.userData.imgUrl = ''
  }
};
</script>

<style lang="less" scoped>
.avatar-uploader  {
  margin: 20px 0;
}
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
</style>