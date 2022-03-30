<template>
  <div class="goods-count">
    <TimeFrame @dateFram="getTime"></TimeFrame>
    <Echarts title="订单数据" :xData="xData" :yData="yData"></Echarts>
    <!-- <div id="main"></div> -->
  </div>
</template>
<script>
// 引入时间范围组件
import TimeFrame from "./TimeFrame";
// 引入echarts
import * as echarts from "echarts";
// 引入Ajax函数
import { orderTotal } from "@/api/order";
//  引入echarts
import Echarts from "@/components/echarts/Line";

export default {
  data() {
    return {
      xData: [],
      yData: [],
      arrTime:'',
    };
  },
  components: { TimeFrame, Echarts },
  methods: {
    /*
    echartsInit() {
      var chartDom = document.getElementById("main");
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999"
            }
          }
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        legend: {
          data: ["Evaporation", "Precipitation", "Temperature"]
        },
        xAxis: [
          {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            axisPointer: {
              type: "shadow"
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "Precipitation",
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              formatter: "{value} ml"
            }
          },
          {
            type: "value",
            name: "Temperature",
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: {
              formatter: "{value} °C"
            }
          }
        ],
        series: [
          {
            name: "Evaporation",
            type: "bar",
            tooltip: {
              valueFormatter: function(value) {
                return value + " ml";
              }
            },
            data: [
              2.0,
              4.9,
              7.0,
              23.2,
              25.6,
              76.7,
              135.6,
              162.2,
              32.6,
              20.0,
              6.4,
              3.3
            ]
          },
          {
            name: "Precipitation",
            type: "bar",
            tooltip: {
              valueFormatter: function(value) {
                return value + " ml";
              }
            },
            data: [
              2.6,
              5.9,
              9.0,
              26.4,
              28.7,
              70.7,
              175.6,
              182.2,
              48.7,
              18.8,
              6.0,
              2.3
            ]
          },
          {
            name: "Temperature",
            type: "line",
            yAxisIndex: 1,
            tooltip: {
              valueFormatter: function(value) {
                return value + " °C";
              }
            },
            data: [
              2.0,
              2.2,
              3.3,
              4.5,
              6.3,
              10.2,
              20.3,
              23.4,
              23.0,
              16.5,
              12.0,
              6.2
            ]
          }
        ]
      };
      option && myChart.setOption(option);
    },
    */

    // 获取订单数据
    async getData(value) {
      let res = await orderTotal({date:value}).then(res=>{
        console.log(res);
      })
      // console.log(res);
    },
    // 获取组件的时间
    getTime(value) {
      this.arrTime = JSON.stringify(value)
      // console.log(this.arrTime);
      this.getData(this.arrTime)   
    }
  },
  mounted() {
    // this.echartsInit();
      // this.getData()
  }
};
</script>
<style lang="less" scoped>
#main {
  height: 500px;
  background-color: #fff;
}
</style>