<template>
  <div style="padding: 20px;">
    <el-button type="primary" @click="dialogVisible = true" style="margin:10px">角色增加</el-button>
    
    <el-table :data="tableData" style="width: 100%;">
      <el-table-column prop="roleName" label="角色名称" width="180"></el-table-column>
      <el-table-column prop="roleRemark" label="角色描述" width="180"></el-table-column>
      <el-table-column label="操作" min-width="220">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click.native="handlerDelete(scope.row)">删除</el-button>
          <el-button size="mini" type="success" @click.native="handlerEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="warning" @click.native="handlerLook(scope.row)">查看</el-button>
          <el-button size="mini" type="info" @click.native="handlerGive(scope.row)">授权</el-button>
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

    <el-dialog title="角色增加" :visible.sync="dialogVisible" width="30%">
      <el-form label-width="100px" class="demo-ruleForm">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleRemark">
          <el-input v-model="roleRemark"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="编辑角色信息" :visible.sync="editVisible">
      <el-form label-width="100px" class="demo-ruleForm" :data="editInfo">
        <el-form-item label="角色名称">
          <el-input v-model="editInfo.roleName"></el-input>
        </el-form-item>
        <!-- <el-form-item label="角色Id">
          <el-input v-model="editInfo.roleId"></el-input>
        </el-form-item>-->
        <el-form-item label="角色描述">
          <el-input v-model="editInfo.roleRemark"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="editForm">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="当前用户信息" :visible.sync="infoVisible" width="30%">
      <table border="0" cellspacing="0" cellpadding="0" v-if="lookInfo">
        <tr>
          <td>角色名称</td>
          <td>{{lookInfo.roleName}}</td>
        </tr>
        <tr>
          <td>角色描述</td>
          <td>{{lookInfo.roleRemark}}</td>
        </tr>
      </table>
    </el-dialog>
    <!--授权  -->
    <el-dialog title="授权" :visible.sync="dialogFormVisible">
      <template>
        <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"
        >全选</el-checkbox>
        <div style="margin: 15px 0;"></div>

        <el-checkbox-group v-model="modulesed" @change="handleCheckedModelsChange">
          <el-checkbox
            v-for="(item,index) in modules"
            :label="item"
            :key="index"
          >{{item.moduleName}}</el-checkbox>
        </el-checkbox-group>
      </template>
      <el-button type="primary" @click="setAut" style="position: relative;left: 80%;top: 10px;">提交</el-button>
    </el-dialog>
  </div>
</template>
<script>
import https from "@/https.js";
import axios from "axios";
export default {
  data() {
    return {
      //  roleData:[],
      dialogVisible: false,
      infoVisible: false,
      dialogFormVisible: false,
      tableData: [],
      roleName: "",
      roleRemark: "",
      lookInfo: [],
      editVisible: false,
      editInfo: [],
      // modules: [
      //   {
      //     moduleId: "",
      //     moduleName: ""
      //   }
      // ],
      modules: [],
      modulesed: [],
      modulesedId: [],
      checkAll: false,
      isIndeterminate: true,
      rowRoleId: "",
      autArr: ["1", "2", "3"],
      test: null,
      query: {
        total: 0,
        pagerNum: 1,
        pageSize: 10
      }
    };
  },
  created() {
    this.getRoleList();
    this.getModelList();
    // this.handleCheckedModelsChange();
  },
  computed: {},
  mounted() {},
  methods: {
    // 列表
    getRoleList() {
      var that = this;
      console.log(that.query);
      https
        .fetchGet("url2/role/list", that.query)
        .then(function(res) {
          console.log(res);
          that.tableData = res.object.list.list;
          that.query.pageSize = res.object.list.size;
          that.query.pagerNum = res.object.list.pageNum;
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
        roleId: row.roleId
      };
      var qs = require("qs");
      if (row.roleId) {
        this.$confirm("确认删除吗?", "提示", {
          type: "warning"
        }).then(() => {
          https
            .fetchPost("/url2/role/del", qs.stringify(param))
            .then(function(res) {
              console.log("删除");
              console.log(res);
              if (res.code == "00") {
                that.getRoleList();
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
      var params = {
        roleName: that.roleName,
        roleRemark: that.roleRemark
      };
      var qs = require("qs");
      https
        .fetchPost("/url2/role/add", qs.stringify(params))
        .then(function(res) {
          console.log(res);
          that.dialogVisible = false;
          that.getRoleList();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 编辑
    editForm() {
      var that = this;
      var qs = require("qs");
      var params = {
        roleId: that.editInfo.roleId,
        roleName: that.editInfo.roleName,
        roleRemark: that.editInfo.roleRemark
      };
      https
        .fetchPost("/url2/role/update", qs.stringify(params))
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
      this.editVisible = true;
      this.editInfo = row;
      console.log(row);
      console.log( this.editInfo);
    },
    // 查看
    handlerLook(row) {
      console.log(row);
      this.lookInfo = row;
      this.infoVisible = true;
    },
    // 所有权限列表
    getModelList() {
      var that = this;
      https
        .fetchPost("/url2/aut/getAll")
        .then(function(res) {
          console.log(res);
          var modle = res.object.lsit;
          for (var i = 0; modle.length; i++) {
            that.modules.push({
              moduleId: modle[i].authorityId,
              moduleName: modle[i].authorityName
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    // 授权弹框 已有权限
    handlerGive(row) {
      console.log(row);
      var that = this;
      this.dialogFormVisible = true;
      this.rowRoleId = row.roleId;
      var params = {
        roleId: row.roleId
      };
      var qs = require("qs");
      https
        .fetchPost("/url2/role/getAut", qs.stringify(params))
        .then(function(res) {
          console.log(res);
          var modle = res.object.list;
          console.log(modle);
          for (var i = 0; i < modle.length; i++) {
            that.modulesed.push(modle[i].authorityName);
            console.log(that.modulesed);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    handleCheckAllChange(val) {
      this.modulesed = val ? this.modules : [];
      this.isIndeterminate = false;
    }, 
    unique(arr) {
      return Array.from(new Set(arr));
    },
    handleCheckedModelsChange(value) { 
      var that = this;
      console.log(this.modulesed);
      console.log(value);
      that.test = value.map(item => item.moduleId);
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.modules.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.modules.length;
    },
    // 给角色授权
    setAut() {
      var that = this;
      var qs = require("qs");
      console.log(that.modulesedId);
      var params = {
        autArr: JSON.stringify(that.test),
        roleId: that.rowRoleId
      };
      https
        .fetchPost("/url2/role/setAut", qs.stringify(params))
        .then(function(res) {
          console.log(params);
          console.log(res);
          that.dialogFormVisible = false;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    handleSizeChange(val) {
      this.query.pageSize = val;
      this.getRoleList();
    },
    handleCurrentChange(val) {
      this.query.pagerNum = val;
      this.getRoleList();
    }
  }
};
</script>
<style scoped lang="scss">
table {
  color: #1f2d3d;
  border-right: 1px solid #c8cbce;
  border-bottom: 1px solid #c8cbce;
  width: 100%;
}
table td {
  padding: 10px;
  border-left: 1px solid #c8cbce;
  border-top: 1px solid #c8cbce;
}
// .el-checkbox {
//   display: block;
//   margin-right: 0 !important;
// }
// >>> .el-checkbox-group {
//   font-size: 0;
//   float: left;
//   width: 50%;
//   text-align: center;
// }
</style>
