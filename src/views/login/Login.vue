<template>
  <div class="box">
    <div class="box1">
      <h3>系统登陆</h3>
      <div class="login">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
          <el-form-item prop="account">
            <el-input
              type="text"
              v-model="ruleForm.account"
              autocomplete="off"
              class="bgc"
              prefix-icon="iconfont icon-account1"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              :type="type"
              v-model="ruleForm.password"
              autocomplete="off"
              class="bgc"
              prefix-icon="iconfont icon-lock"
              @keyup="check"
            >
              <i
                slot="suffix"
                @click="changeType"
                class="iconfont"
                :class="type === 'password' ? 'icon-closeeye':'icon-openeye'"
              ></i>
            </el-input>
          </el-form-item>
          <el-button type="primary" class="btn" @click="check">登录</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import {login} from '@/api/user.js'
import local from "@/utils/local.js"
// 导入计算路由
import {calcRouterMenu} from '@/router/index.js'

export default {
  data() {
    return {
      ruleForm: {},
      rules: {
        account: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      },
      type: "password",
    };
  },
  methods: {
    // 登录
    check() {
      this.$refs.ruleForm.validate(async(error) => {
        if (error) {
            // login(this.ruleForm).then((res) => {
            //     let {data} = res
            //     if(data.code ===1 | data.code === 5001){
            //       this.$message.error(data.msg)
            //     }else if (data.code === 0){
            //       this.$message({
            //         type:'success',
            //         message:data.msg
            //       })
            //       local.set('token',data.token)
            //       // this.$router.push('/home')
            //     }else{
            //       console.log(data);
            //     }
            // });

            try{
              let res = await login(this.ruleForm)
              local.set('token',res.token);
              local.set('role',res.role)
              calcRouterMenu()
              this.$router.push('/home');
              // window.location.reload()
            }catch (error){
                console.log(error);
              }
        } else {
            return;
        }
    });
    },
    // 改变类名
    changeType(){
        this.type = this.type === 'password' ? 'text' : 'password'
    }
  }
};
</script>
<style lang="less" scoped>
.box {
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #2d3a4b;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .box1 {
    width: 300px;
    color: #fff;
    h3 {
      margin-bottom: 20px;
      text-align: center;
      font-size: 24px;
    }
    .bgc {
      /deep/ input {
        background-color: rgba(0, 0, 0, 0.1) !important;
      }
    }
    .btn {
      width: 100%;
    }
  }
}
</style>