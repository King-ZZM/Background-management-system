<template>
  <div class="account-list">
    <Panel name="账号列表">
      <el-table
        :data="tableData"
        ref="account"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        refs="form"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column fixed prop="account" label="账号"></el-table-column>
        <el-table-column prop="userGroup" label="用户组"></el-table-column>
        <el-table-column prop="ctime" label="创建时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="editAccount(scope.row)" type="default" size="small">编辑</el-button>
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

      <!-- 批量删除和取消全选 -->
      <div style="margin-top: 20px">
        <el-button type="danger" @click="multidel()">批量删除</el-button>
        <el-button type="primary" @click="cancelsel()">取消选择</el-button>
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
import { userList, userEdit, userdel, userdelMutil } from "@/api/user.js";

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
      tableData: []
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
    // 批量删除
    multidel() {
      if (this.ids.length) {
        // 确认删除消息弹框
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            userdelMutil({
              ids: JSON.stringify(this.ids)
            }).then(async res => {
              await this.getData();
              if (this.currentPage > 1 && this.tableData.length === 1) {
                this.currentPage--;
                this.getData();
              }
            });
          })
          .catch(() => {});
      } else {
        this.$message("请选择数据");
      }
    },
    // 取消全选
    cancelsel() {
      this.$refs.account.clearSelection();
    },
    // 获取用户id数组集合
    handleSelectionChange(e) {
      let arr = [];
      e.map(v => {
        arr.push(v.id);
      });
      this.ids = arr;
    },
    // 弹窗确定按钮
    confirmBtn() {
      userEdit(this.accountForm).then(res => {
        // console.log(res);
        this.getData();
      });
      this.dialogFormVisible = false;
    },
    // 删除按钮
    del(data) {
      userdel({
        id: data.id
      }).then(async (res) => {
        await this.getData();
        if (this.currentPage > 1 && this.tableData.length === 1) {
          this.currentPage--;
          this.getData();
        }
      });
    },
    // 获取数据渲染
    getData() {
      userList({
        currentPage: this.currentPage, // 当前页码
        pageSize: this.pageSize // 每页条数
      }).then(res => {
        res.data.map(data => {
          data.ctime = data.ctime.split("T")[0];
        });
        this.tableData = res.data;
        this.total = res.total;
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
</style>