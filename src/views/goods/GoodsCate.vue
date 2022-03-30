<template>
  <div class="account-list">
    <Panel name="商品分类">
      <el-button
        slot="btn"
        @click="dialogFormVisible = true"
        class="addbtn"
        style="float: right; padding: 3px 0"
        type="primary"
      >添加分类</el-button>
      <el-table
        :data="tableData"
        ref="account"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column fixed type="index" label="序号" width="100px"></el-table-column>
        <el-table-column prop="cateName" label="分类名称">
          <template slot-scope="scope">
            <el-input v-if="scope.row.isEdit" size="small" v-model="scope.row.cateName"></el-input>
            <span v-else>{{scope.row.cateName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="state" label="是否启用">
          <template slot-scope="scope">
            <el-switch
              :disabled="!scope.row.isEdit"
              v-model="scope.row.state"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              @click="edit(scope.row)"
              :type="!scope.row.isEdit ? 'default' : 'primary'"
              size="small"
            >{{scope.row.isEdit ? '完成' : '编辑'}}</el-button>
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
      <!-- 编辑删除弹窗 -->
      <el-dialog title="编辑" :visible.sync="dialogFormVisible">
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmBtn">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 添加分类弹窗 -->
      <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
        <el-form :model="addCata">
          <el-form-item label="分类名称" :label-width="formLabelWidth">
            <el-input v-model="addCata.cateName" autocomplete="off" placeholder="分类名称"></el-input>
          </el-form-item>
          <el-form-item label="是否启用" :label-width="formLabelWidth">
            <el-switch v-model="addCata.state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
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
import { getCate, editCate, delCate, addCate } from "@/api/goods.js";

export default {
  data() {
    return {
      ids: {},
      total: 0,
      currentPage: 1,
      pageSize: 5,
      dialogFormVisible: false,
      accountForm: {},
      formLabelWidth: "80px",
      tableData: [],
      addCata:{},
    };
  },
  components: {
    Panel
  },
  methods: {
    // 点击编辑修改数据
    edit(e) {
      this.accountForm = JSON.parse(JSON.stringify(e));
      e.isEdit = !e.isEdit;
      if (!e.isEdit) {
        editCate(this.accountForm).then(res => {
          // console.log(res);
        });
      }
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
    handleSelectionChange(e) {},
    // 弹窗确定按钮
    confirmBtn() {
      addCate(this.addCata).then(res => {
        this.getData();
        this.dialogFormVisible = false
      });
    },
    // 删除按钮
    del(data) {
      delCate({
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
      getCate({
        currentPage: this.currentPage, // 当前页码
        pageSize: this.pageSize // 每页条数
      }).then(res => {
        res.data.map(data => {
          data.state = !!data.state;
          data.isEdit = false;
        });
        this.tableData = res.data;
        this.total = res.total;
      });
    },
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
.addbtn {
  position: relative;
  top: -8px;
  width: 70px;
  height: 35px;
  background-color: #409eff;
  color: #fff;
}
</style>