<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>{{name}}</span>
      <!-- 具名插槽 -->
      <slot name="btn"></slot>
    </div>
    <slot></slot>
  </el-card>
</template>
<script>
export default {
    props:{
        name:{
            type:String,
        }
    },
};
</script>
<style lang="less" scoped>
</style>