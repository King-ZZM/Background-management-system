<template>
  <Panel name="添加账号">
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <el-form-item label="账号" prop="account">
        <el-input v-model="form.account"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="用户组">
        <el-select placeholder="请选择用户组" v-model="form.userGroup">
          <el-option label="超级管理员" value="超级管理员"></el-option>
          <el-option label="普通管理员" value="普通管理员"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="add">添加</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </Panel>
</template>
<script>
import Panel from "@/components/Panel";
// 引入工具函数
import {addAccount} from '@/api/user.js'
// 引入验证密码规则
import {checkPass} from '@/utils/tool.js'

export default {
  data() {
      let checkAccount = (_, value, callback) =>{
          if(!/^[\u4e00-\u9fa5a-zA-Z0-9_-]{3,16}$/.test(value)){
             callback(new Error('账号不符合规范,账号长度3-16位,中英文、数字和-_'))
          }
          callback()
      };
      let checkPassword = (_, value, callback) =>{
          let res = checkPass(value)
          // console.log(res);
          if(res){
            callback(new Error(res))
          }else{
            callback()
          }
      };

    return {
      form: {
          account:'',
          password:"",
      },
      rules:{
      account:[
          { required:true,validator:checkAccount,trigger:'blur'}
      ],
      password:{ required:true,validator:checkPassword,trigger:'blur'}
  }
    };
  },
  components: { Panel },
  methods:{
      // 添加按钮
      add(){
        this.$refs.form.validate(ok=>{
            if(ok){
                addAccount(this.form).then(res=>{
                    this.$router.push('/account/account-list')
                })
            }else {
                return
            }
        })
      },
    // 重置按钮
    reset(){
        this.$refs.form.resetFields()
    }
  }
};
</script>
<style lang="less" scoped>
/deep/.el-input__inner {
    width: 206px;
}
</style>