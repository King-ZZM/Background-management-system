<template>
  <Panel name="修改密码">
    <el-form ref="form" :model="form" label-width="100px" :rules="rules">
      <el-form-item label="原密码" prop="oldPass">
        <el-input v-model="form.oldPass"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPass">
        <el-input v-model="form.newPass" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="confirmNewPass">
        <el-input v-model="form.confirmNewPass" type="password"></el-input>
      </el-form-item>
      
      
      <el-form-item>
        <el-button type="primary" @click="confirm">确定</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </Panel>
</template>
<script>
import Panel from "@/components/Panel";
// 引入工具函数
import {changePass} from '@/api/user.js'
// 引入验证密码规则
import {checkPass} from '@/utils/tool.js'

export default {
  data() {
      let checkOldPass = (_, value, callback) =>{
          let res = checkPass(value)
          if(res){
              callback(new Error(res))
          }else {
              callback()
          }
      };
      let checkNewPass = (_, value, callback) =>{
          let res = checkPass(value)
          if(res){
              callback(new Error('新'+res))
          }else {
              if(this.form.confirmNewPass){
                  this.$refs.form.validateField('confirmNewPass')
              }
              callback()
          }
      };
      let checkConfirmNewPass = (_, value, callback) =>{
          if(!(value === this.form.newPass)){
            callback(new Error('两次密码不一致'))
          }else if(!value){
              callback(new Error('确认密码不能为空'))
          }
          callback()
      };

    return {
      form: {},
      rules:{
      oldPass:[
          { required:true,validator:checkOldPass,trigger:'blur'}
      ],
      newPass:{ required:true,validator:checkNewPass,trigger:'blur'},
      confirmNewPass:{ required:true,validator:checkConfirmNewPass,trigger:'blur'}
  }
    };
  },
  components: { Panel },
  methods:{
      // 确定按钮
      confirm(){
          let newPwd = {newPwd : this.form.newPass}
          let res = changePass(newPwd)
          console.log(res);
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