<template>
  <div id="chartsDom" ref="chartsDom"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  props: {
    title: String,
    xData: {
      type: Array
    },
    yData: {
      type: Array
    }
  },
  methods: {
    echarts() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = echarts.init(document.getElementById("chartsDom"));
      // 绘制图表
      let option = {
        title: {
          text: this.title,
          top: 10,
          left: 20
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: [] // 动态数据
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [] // 动态数据
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "",
            type: "line",
            stack: "Total",
            data: [] // 动态数据
          },
          {
            name: "",
            type: "line",
            stack: "Total",
            data: [] // 动态数据
          }
        ]
      };
      option && this.myChart.setOption(option);
    },
    // 动态响应窗口变化
    resize() {
      // console.log("窗口尺寸变化了");
      //   console.log(this.myChart);
      this.myChart.resize();
    }
  },
  // 监听数据变化, 可以监听异步数据
  watch: {
    xData() {
      let legend = [];
      let series = [];
      this.yData.map(v => {
        legend.push(v.name);
        series.push({ ...v, type: "line", stack: "Total" });
      });
      this.myChart.setOption({
        xAxis: { data: this.xData },
        legend: { data: legend },
        series
      });
    }
  },
  mounted() {
    this.echarts();
    window.addEventListener("resize", this.resize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resize);
  }
};
</script>

<style lang="less" scoped>
#chartsDom {
  margin-top: 30px;
  height: 500px;
  background-color: #fff;
}
</style>