<template>
  <div class="box">
    <div class="left">
      <LeftContent />
    </div>
    <div class="right">
      <RightHeader />
      <div class="right-main" :style="{width:width + 'px'}">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import LeftContent from "./LeftContent.vue";
import RightHeader from "./RightHeader.vue";

export default {
  components: {
    LeftContent,
    RightHeader
  },
  data() {
    return {
      width: ""
    };
  },
  methods: {
    // 计算表格宽度
    calcWidth() {
      this.width = document.body.clientWidth - 240;
    }
  },
  beforeDestroy() {
    // 移除监听器
    window.removeEventListener("resize", this.calcWidth);
  },
  created() {
    this.calcWidth();
    // 添加事件监听
    window.addEventListener("resize", this.calcWidth);
  }
};
</script>
<style lang="less" scoped>
.box {
  display: flex;
  height: 100%;
  .left {
    width: 200px;
  }
  .right {
    display: flex;
    flex: 1;
    flex-direction: column;
    // background-color: red;
    .right-main {
      flex: 1;
      padding: 20px;
      // overflow-y: auto;
      background-color: #f0f2f5;
      overflow-x: auto;
    }
  }
}
</style>