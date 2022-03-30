<template>
  <div class="goods-count">
    <el-form :model="form" label-width="80px">
      <el-form-item label="时间范围">
        <el-date-picker
          v-model="form.date"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
          @change="change"
        ></el-date-picker>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
// 引入工具函数
import {formatDate} from '@/utils/tool'

export default {
  data() {
    return {
      form: {},
      pickerOptions:{},
    };
  },
  methods:{
    change(e){
      // console.log(e);
      let date = JSON.parse(JSON.stringify(e))
      date = date.map(v=>{
        // return v.split('.')[0].replace('T',' ')
        return formatDate(v)
      }) 
      // console.log(date);
      this.$emit('dateFram',date)
    }
  }
};
</script>
<style lang="less" scoped>
</style>