<template>
  <div class="account-list">
    <Panel name="商品列表">
      <el-table
        :data="tableData"
        ref="account"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        refs="form"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" class="demo-table-expand">
              <el-form-item label="商品ID" class="el-item-cate">
                <span>{{ props.row.id}}</span>
              </el-form-item>
              <el-form-item label="商品名称" class="el-item-cate">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="所属分类" class="el-item-cate">
                <span>{{ props.row.category }}</span>
              </el-form-item>
              <el-form-item label="商品价格" class="el-item-cate">
                <span>{{ props.row.price }}</span>
              </el-form-item>
              <el-form-item label="商品图片" class="el-item-cate">
                <span>
                  <el-avatar shape="square" :size="50" :src="props.row.imgUrl"></el-avatar>
                </span>
              </el-form-item>
              <el-form-item label="创建时间" class="el-item-cate">
                <span>{{ props.row.ctime.slice(0,19).replace('T'," ") }}</span>
              </el-form-item>
              <el-form-item label="商品评价" class="el-item-cate">
                <span>{{ props.row.rating }}</span>
              </el-form-item>
              <el-form-item label="商品销量" class="el-item-cate">
                <span>{{ props.row.sellCount }}</span>
              </el-form-item>
              <el-form-item label="商品描述" class="el-item-cate">
                <span>{{ props.row.goodsDesc }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="商品名称"></el-table-column>
        <el-table-column prop="category" label="所属分类"></el-table-column>
        <el-table-column prop="price" label="商品价格"></el-table-column>
        <el-table-column label="商品图片">
          <template slot-scope="scope">
            <div class="block">
              <el-avatar shape="square" :size="50" :src="scope.row.imgUrl"></el-avatar>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="goodsDesc" label="商品描述"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="editAccount(scope.row)" type="primary" size="small">编辑</el-button>
            <el-popconfirm title="确定删除？" @confirm="del(scope.row)">
              <el-button class="delBtn" slot="reference" type="danger" size="small">删除</el-button>
            </el-popconfirm>
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

      <!-- 弹窗 -->
      <el-dialog title="编辑" :visible.sync="dialogFormVisible">
        <el-form :model="accountForm">
          <el-form-item label="账号" :label-width="formLabelWidth">
            <el-input v-model="accountForm.account" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="用户组" :label-width="formLabelWidth">
            <el-select v-model="accountForm.userGroup" placeholder="请选择">
              <el-option label="超级管理员" value="超级管理员"></el-option>
              <el-option label="普通管理员" value="普通管理员"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmBtn">确 定</el-button>
        </div>
      </el-dialog>
    </Panel>
  </div>
</template>
<script>
import Panel from "@/components/Panel";
// 引入ajax函数
import { GoodsList, orderDel } from "@/api/goods.js";

export default {
  data() {
    return {
      ids: {},
      total: 0,
      currentPage: 1,
      pageSize: 5,
      dialogFormVisible: false,
      accountForm: {},
      formLabelWidth: "60px",
      tableData: [],
      imgUrl: ""
    };
  },
  components: {
    Panel
  },
  methods: {
    // 点击编辑修改数据
    editAccount(e) {
      this.accountForm = JSON.parse(JSON.stringify(e));
      this.dialogFormVisible = true;
    },
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
    // 获取用户id数组集合
    handleSelectionChange(e) {
      // let arr = [];
      // e.map(v => {
      //   arr.push(v.id);
      // });
      // this.ids = arr;
    },
    // 编辑中的弹窗确定按钮
    confirmBtn() {
      // userEdit(this.accountForm).then(res => {
      //   // console.log(res);
      //   this.getData();
      // });
      // this.dialogFormVisible = false;
    },
    // 删除按钮
    del(data) {
      orderDel({
        id: data.id
      }).then(async res => {
        await this.getData();
        if (this.currentPage > 1 && this.tableData.length === 1) {
          this.currentPage--;
          this.getData();
        }
      });
    },
    // 获取数据渲染
    getData() {
      GoodsList({
        currentPage: this.currentPage, // 当前页码
        pageSize: this.pageSize // 每页条数
      }).then(res => {
        // console.log(res);
        res.data.map(v => {
          if (v.imgUrl.indexOf("http://127.0.0.1:5000") === -1) {
            // console.log(111);
            v.imgUrl = "http://127.0.0.1:5000/upload/imgs/goods_img/" + v.imgUrl;
          }
        });
        this.tableData = res.data;
        this.total = res.total;
        console.log(this.tableData);
      });
    }
  },
  created() {
    this.getData();
  }
};
</script>
<style lang="less" scoped>
.el-pagination {
  margin-top: 20px;
}
/deep/ .el-dialog {
  width: 20%;
  .el-form-item__label {
    text-align: center;
  }
}
.delBtn {
  margin-left: 10px;
}
.demo-table-expand {
  padding-left: 60px;
  display: flex;
  flex-wrap: wrap;
  .el-item-cate {
    width: 50%;
  }
}
</style>