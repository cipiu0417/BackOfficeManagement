<template>
  <div class="manage">
    <!-- 打开弹窗的按钮 -->
    <el-button type="primary" @click="handleAdd">+ 新增</el-button>
    <!-- 弹窗中的内容 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <!-- form表单 -->
      <el-form
        :inline="true"
        :rules="rules"
        ref="form"
        :model="form"
        label-width="80px"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="form.age" placeholder="请输入年龄"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择性别">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <el-date-picker
            v-model="form.birth"
            type="date"
            placeholder="请选择日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input v-model="form.addr" placeholder="请输入地址"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelForm">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定 </el-button>
      </span>
    </el-dialog>
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="姓名" width="120px">
      </el-table-column>
      <el-table-column prop="age" label="年龄" width="120px"> </el-table-column>
      <el-table-column
        prop="sex"
        label="性别"
        width="100px"
        :formatter="changeToChar"
      >
      </el-table-column>
      <el-table-column prop="birth" label="出生日期" width="160px">
      </el-table-column>
      <el-table-column prop="addr" label="地址"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { addUser, delUser, editUser, getUser } from "../api";
export default {
  name: "User",
  data() {
    return {
      dialogVisible: false,
      form: {
        name: "",
        age: "",
        sex: "",
        birth: "",
        addr: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          {
            min: 2,
            max: 15,
            message: "长度在 2 到 15 个字符",
            trigger: "blur",
          },
        ],
        age: [{ required: true, message: "请选择年龄", trigger: "change" }],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
      },
      tableData: [],
      modelType: 0, // 0表示新增，1表示编辑
    };
  },
  methods: {
    // 点击新增用户
    handleAdd() {
      this.modelType = 0;
      this.dialogVisible = true;
    },
    // 点击取消按钮
    cancelForm() {
      this.handleClose();
    },
    // async saveData() {
    //   this.$refs.form.validate((valid) => {
    //     // console.log(valid);
    //     if (valid) {
    //       console.log(this.form, "submit");
    //     }
    //   });
    // },
    // async submitForm() {
    //   await this.saveData();
    //   this.handleClose();
    // },

    // 点击确定按钮
    submitForm() {
      this.$refs.form.validate((valid) => {
        // 判断表单中的数据是否有效
        if (valid) {
          // 若当前是新增表单
          if (this.modelType === 0) {
            addUser(this.form).then(() => {
              // 刷新当前列表
              this.getUserList();
            });
            this.handleClose();
          }
          // 若当前是编辑表单
          else {
            editUser(this.form).then(() => {
              this.getUserList();
            });
            this.handleClose();
          }
        }
      });
    },
    // 关闭弹窗前要做的事
    handleClose() {
      // console.log(this.form);
      this.$refs.form.resetFields();
      this.dialogVisible = false;
    },
    changeToChar(row) {
      return row.sex == 1 ? "男" : "女";
    },

    // 点击编辑按钮
    handleEdit(row) {
      // console.log("edit", row);
      this.modelType = 1;
      this.dialogVisible = true;
      // 弹窗内容回显，需要对当前行数据进行深拷贝，否则改变form时会改变row
      this.form = JSON.parse(JSON.stringify(row));
    },

    // 点击删除按钮
    handleDelete(row) {
      // console.log("delete", row);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delUser({ id: row.id }).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getUserList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 用来获取用户列表
    getUserList() {
      getUser().then(({ data }) => {
        console.log("data", data);
        this.tableData = data.list;
      });
    },
  },
  mounted() {
    this.getUserList();
  },
};
</script>

<style></style>
