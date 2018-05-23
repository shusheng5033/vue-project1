<template>
    <div class="user">
        <el-row>
            <el-col :span="24">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
                    <el-breadcrumb-item>用户列表</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-input placeholder="请输入内容" class="search-input">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
                <el-button type="success" plain>添加用户</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                 <el-table :data="userList" border style="width: 100%">
                    <el-table-column type="index" width="50"></el-table-column>
                    <el-table-column prop="username" label="姓名" width="180"></el-table-column>
                    <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
                    <el-table-column prop="mobile" label="电话" width="180"></el-table-column>
                    <el-table-column label="用户状态" width="180">
                        <template slot-scope="scope">
                            <el-switch v-model="value3"></el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="primary" icon="el-icon-edit" size="mini" plain></el-button>
                            <el-button type="danger" icon="el-icon-delete" size="mini" plain></el-button>
                            <el-button type="warning" icon="el-icon-check" size="mini" plain></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <div class="page">
             <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="1"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import {getUserList} from '@/api'
export default {
    data() {
      return {
        userList: [],
        value3:'true'
      }
    },
    mounted(){
        this.initList();
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      initList(){
          let params = {
              params:{
                  query:'',
                  pagenum:1,
                  pagesize:3
              }
          }
          getUserList(params).then(res=>{
              console.log(res)
              this.userList = res.data.users;
          })
      }
    },
}
</script>
<style lang="scss" scoped>
.user {
  .search-input {
    width: 300px;
    margin-bottom:15px;
  }
  .page {
    padding: 5px 0;
    background-color: #D3DCE6;
  }
}
</style>


