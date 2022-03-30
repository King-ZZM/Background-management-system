<template>
  <div class="home">
    <div class="cards">
      <Card v-for="item in cardObj" :key="item.id" :data="item"></Card>
    </div>
    <LineData title="数据统计" :xData="xData" :yData="yData"></LineData>
  </div>
</template>
<script>
// 引入卡片组件
import Card from "./Card.vue";
// 引入echarts折线图
import LineData from '@/components/echarts/Line'
// 引入Ajax函数
import {orderData} from '@/api/order'


export default {
  data() {
    return {
      cardObj: [
        {
          id: 1,
          title: "总订单",
          num: 102400,
          icon: "icon-order",
          color: "#1296db"
        },
        {
          id: 2,
          title: "总销售额",
          num: 148550,
          icon: "icon-money1",
          color: "#d4237a"
        },
        {
          id: 3,
          title: "今日订单数",
          num: 41275,
          icon: "icon-order1",
          color: "#1296db"
        },
        {
          id: 4,
          title: "今日销售额",
          num: 235195,
          icon: "icon-money",
          color: "#1afa29"
        }
      ],
      xData:[],
      yData:[],

    };
  },
  components: {
    Card,
    LineData
  },
  methods:{
    async getData(){
      let res  = await orderData()
      // console.log(res);
      this.xData = res.xData
      this.yData.push(
        {
          name:'订单',
          data:res.orderData
        },
        {
          name:'销售额',
          data: res.amountData
        },
      )
      this.cardObj[0].num = res.totalOrder
      this.cardObj[1].num = res.totalAmount
      this.cardObj[2].num = res.todayOrder
      this.cardObj[3].num = res.totayAmount
    }
  },
  created(){
    this.getData()
  }
};
</script>
<style lang="less" scoped>
.home {
  .cards {
    display: flex;
    justify-content: space-between;
  }
}

@media screen and(max-width: 1100px) {
  .cards {
    flex-wrap: wrap;
    .card {
      width: 49%;
      margin-bottom: 10px;
    }
  }
}
</style>