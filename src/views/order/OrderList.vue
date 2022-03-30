<template>
  <div class="contain">
    <el-form label-width="80px" class="el-form" :model="form" ref="form">
      <el-form-item label="订单号" prop="orderNo">
        <el-input placeholder="订单号" v-model="form.orderNo" class="el-input"></el-input>
      </el-form-item>
      <el-form-item label="收货人"  prop="consignee">
        <el-input placeholder="收货人" v-model="form.consignee" class="el-input"></el-input>
      </el-form-item>
      <el-form-item label="手机号"  prop="phone">
        <el-input placeholder="手机号" v-model="form.phone" class="el-input"></el-input>
      </el-form-item>
      <el-form-item label="订单状态"  prop="orderState">
        <el-select placeholder="订单状态" v-model="form.orderState" class="el-input">
          <el-option value="已受理">已受理</el-option>
          <el-option value="派送中">派送中</el-option>
          <el-option value="已完成">已完成</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择时间"  prop="date">
        <el-date-picker
          v-model="form.date"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-button type="primary" @click="queryOrder">查询</el-button>
      <el-button type="primary" @click="reset">重置</el-button>
    </el-form>
 
    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="orderNo" label="订单号"></el-table-column>
      <el-table-column prop="orderTime" label="下单时间"></el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
      <el-table-column prop="consignee" label="收货人"></el-table-column>
      <el-table-column prop="deliverAddress" label="配送地址"></el-table-column>
      <el-table-column prop="deliveryTime" label="送达时间"></el-table-column>
      <el-table-column prop="remarks" label="用户备注"></el-table-column>
      <el-table-column prop="orderAmount" label="订单金额"></el-table-column>
      <el-table-column prop="orderState" label="订单状态"></el-table-column>
      <el-table-column  label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="look(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" v-auto="'super'" size="small" @click="edit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页器 -->
    <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
  </div>
</template>
<script>
// 引入ajax函数
import { orderList, orderSearch } from '@/api/order'
// 引入工具函数
import {getTime} from '@/utils/tool'

export default {
  data() {
    return {
      form: {
          orderNo:'',
          consignee:'',
          consignee:'',
          phone:'',
          orderState:'',
          date:'',
      },
      tableData:[],
      total: 0,
      currentPage: 1,
      pageSize: 5,
    };
  },
  methods:{
    // 查看按钮
      look(){},
      // 每页条数变化
    handleSizeChange(e) {
      this.pageSize = e;
      this.getData();
    },
    // 当前页码变化
    handleCurrentChange(e) {
      this.currentPage = e;
      this.getData();
    },
    // 获取订单
    async getData(){
        await orderList({
            currentPage:this.currentPage,
            pageSize:this.pageSize,
            ...this.form,
            date: JSON.stringify(this.form.date)
        }).then(res=>{
            // console.log(res);
            res.data.map(v=>{
                v.deliveryTime = getTime(v.deliveryTime)
                v.orderTime = getTime(v.orderTime)
            })
            this.tableData = res.data
            this.total = res.total
        })
    },
    // 查询订单
    queryOrder(){
        orderSearch({
            currentPage:this.currentPage,
            pageSize:this.pageSize,
            ...this.form,
            date: JSON.stringify(this.form.date)
        }).then(res=>{
            console.log(res);
            this.tableData = res.data
            this.total = res.total
        })
    },
    // 编辑
    edit(data){
      // console.log(data);
      this.$router.push({path:'/order/order-add', query:{id:data.id}})
    },
    // 重置
    reset(){
        this.$refs.form.resetFields()
    },
  },
  created(){
      this.getData()
  },
};
</script>
<style lang="less" scoped>
.contain {
    padding: 30px 0;
    background-color: #fff;
}
.el-form {
  display: flex;
  flex-wrap: wrap;
  /deep/ .el-input {
    width: 250px;
  }
  .el-button {
    margin-left: 20px;
    height: 40px;
  }
}
.el-pagination{
    margin: 20px 0 0 10px;
}
</style>