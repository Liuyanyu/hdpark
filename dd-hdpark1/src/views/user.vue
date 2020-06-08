<template>
   <div style="padding: 20px;">
    <el-button type="primary" @click="dialogVisible = true" style="margin:10px">用户增加</el-button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="userName" label="用户名" width="180"></el-table-column>
      <el-table-column prop="userPhone" label="手机号" width="180"></el-table-column>
      <el-table-column prop="userRole" label="角色名称" width="180"></el-table-column>
      <el-table-column label="操作" min-width="220">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click.native="handlerDelete(scope.row)">删除</el-button>
          <el-button size="mini" type="success" @click.native="handlerEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="warning" @click.native="handlerLook(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="right page"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="query.pagerNum"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="query.pageSize"
      layout="total, sizes, prev, pager, next"
      :total="query.total"
    ></el-pagination>
    <!-- 增加 -->

    <el-dialog title="增加用户" :visible.sync="dialogVisible">
      <el-form :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input v-model="pass"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="phone"></el-input>
        </el-form-item>
        <el-form-item label="添加角色">
          <el-select v-model="roleValue" placeholder="请选择">
            <el-option
              v-for="item in roleOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 查看 -->
    <el-dialog title="查看用户信息" :visible.sync="infoVisible">
      <table border="0" cellspacing="0" cellpadding="0" :data="lookInfo">
        <tr>
          <td>用户名</td>
          <td>{{lookInfo.userName}}</td>
        </tr>
        <!-- <tr>
          <td>密码</td>
          <td>{{lookInfo.userPassword}}</td>
        </tr>-->
        <tr>
          <td>手机号</td>
          <td>{{lookInfo.userPhone}}</td>
        </tr>
        <tr>
          <td>角色</td>
          <td>{{lookInfo.userRole}}</td>
        </tr>
      </table>
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog title="编辑用户信息" :visible.sync="editVisible">
      <el-form :rules="rules" label-width="100px" class="demo-ruleForm" :data="editInfo">
        <!-- <el-form-item label="用户名">
          <el-input v-model="editInfo.userId"></el-input>
        </el-form-item>-->
        <!-- <el-form-item label="密码">
          <el-input v-model="editInfo.userPassword"></el-input>
        </el-form-item>-->
        <el-form-item label="手机号">
          <el-input v-model="editInfo.userPhone"></el-input>
        </el-form-item>
        <el-form-item label="添加角色">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="editForm">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    
  </div>
</template>

<script>
import https from "@/https.js";
// import axios from "axios";
export default {
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      infoVisible: false,
      editVisible: false,
      ruleForm: {
        name: "",
        pass: "",
        phone: "",
        userId: ""
      },
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        pass: [
          { required: true, message: "请输入密码", trigger: "change" },
          { max: 11, message: "长度为11个字符", trigger: "blur" }
        ],
        phone: [{ required: true, message: "请输入手机号", trigger: "change" }]
      },
      name: "",
      pass: "",
      phone: "",
      userId: "",
      lookInfo: [],
      editInfo: {},
      modleList: [],
      controlList: [],
      roleId: [],
      list: [],
      options: [
        {
          value: "",
          label: ""
        }
      ],
      value: "",
      roleList: [],
      roleOptions: [
        {
          value: "",
          label: ""
        }
      ],
      roleValue: "",
      query: {
        total: 0,
        pagerNum: 1,
        pageSize: 10
      }
    };
  },
  created() {
    this.getUserList();
    var that = this;
    https
      .fetchGet("url2/role/list")
      .then(function(res) {
        console.log(res);
        that.roleList = res.object.list.list;
        for (var i = 0; i < that.roleList.length; i++) {
          that.roleOptions.push({
            value: that.roleList[i].roleId,
            label: that.roleList[i].roleName
          });
          console.log(that.roleValue);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  computed: {},
  mounted() {},
  methods: {
    // 所有用户列表
    getUserList() {
      var that = this;
      https
        .fetchGet("/url2/user/list", that.query)
        .then(function(res) {
          console.log(res);
          that.tableData = res.object.list.list;
          that.query.pageSize = res.object.list.size;
          that.query.pagerNum = res.object.list.pageNum,
          that.query.total = res.object.list.total;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 删除
    handlerDelete(row) {
      var that = this;
      console.log(row);
      var param = {
        userId: row.userId
      };
      var qs = require("qs");
      if (row.userId) {
        this.$confirm("确认删除吗?", "提示", {
          type: "warning"
        }).then(() => {
          https
            .fetchPost("/url2/user/remove", qs.stringify(param))
            .then(function(res) {
              console.log("删除");
              console.log(res);
              if (res.code == "00") {
                console.log("1111");
                that.getUserList();
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        });
      }
    },
    // 增加
    submitForm() {
      var that = this;
      // 获取角色列表

      var params = {
        userName: that.name,
        passWord: that.pass,
        userPhone: that.phone,
        userRole: that.roleValue
      };
      var qs = require("qs");
      https
        .fetchPost("/url2/user/add", qs.stringify(params))
        .then(function(res) {
          console.log(res);
          if (res.code == "00") {
            that.dialogVisible = false;
            that.getUserList();
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 编辑
    editForm() {
      var that = this;
      var qs = require("qs");
      console.log(that.value);
      var params = {
        userId: that.editInfo.userId,
        userPhone: that.editInfo.userPhone,
        roleId: that.value
      };
      https
        .fetchPost("/url2/user/update", qs.stringify(params))
        .then(function(res) {
          console.log(res);
          that.editVisible = false;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 编辑弹框
    handlerEdit(row) {
      var that = this;
      this.editVisible = true;
      this.editInfo = row;
      console.log(row);
      // 获取角色列表
      https
        .fetchGet("url2/role/list")
        .then(function(res) {
          console.log(res);
          that.list = res.object.list.list;
          console.log(that.list);
          for (var i = 0; i < that.list.length; i++) {
            console.log(that.list[i].roleName);
            that.options.push({
              value: that.list[i].roleId,
              label: that.list[i].roleName
            });
            console.log(that.value);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 查看弹框
    handlerLook(row) {
      console.log(row);
      this.lookInfo = row;
      this.infoVisible = true;
    },
    handleSizeChange(val) {
      this.query.pageSize = val;
      this.getUserList();
    },
    handleCurrentChange(val) {
      this.query.pagerNum = val;
      this.getUserList();
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }
};
</script>

<style scoped lang="scss">
table {
  width: 100%;
  color: #1f2d3d;
  border-right: 1px solid #c8cbce;
  border-bottom: 1px solid #c8cbce;
}
table td {
  padding: 10px;
  border-left: 1px solid #c8cbce;
  border-top: 1px solid #c8cbce;
}
.el-checkbox {
  display: block;
}
</style>
