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
                <el-input placeholder="请输入内容" class="search-input" v-model="query" @keyup.native.enter="initList">
                    <el-button slot="append" icon="el-icon-search" @click="initList"></el-button>
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
                            <el-switch v-model="scope.row.ms_state" @change="changeUserState(scope.row)"></el-switch>
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
                :current-page="currentPage"
                :page-sizes="[2, 3, 4, 5]"
                :page-size='pageSize'
                layout="total, sizes, prev, pager, next, jumper"
                :total='total'>
            </el-pagination>
        </div>
    </div>
</template>
<script>
import {getUserList,changeUserState} from '@/api'
export default {
    data() {
      return {
        userList: [],
        query:'',
        total:0,
        pageSize:2,
        currentPage:1,
        value:'true',
        nameid:''
      }
    },
    mounted(){
        this.initList();
    },
    methods: {
    // 每页显示条数改变
        handleSizeChange(val) {
            this.pageSize = val;
            console.log(`每页 ${val} 条`);
            this.initList();
        },
    //   当前页码改变
        handleCurrentChange(val) {
            this.currentPage = val;
            console.log(`当前页: ${val}`);
            this.initList();
        },
    //   switch按钮发生改变
        changeUserState(row){
            changeUserState({uid:row.id,type:row.mg_state}).then(res=>{
               if(res.meta.status === 200){
                   this.$message({
                       type:'success',
                       message:'修改用户状态成功'
                   })
               }else {
                   this.$message({
                       type:'warning',
                       message:res.meta.msg
                   })
               }
            })
        },
    //   获取数据并渲染
        initList(){
            let params = {
                  params:{
                    query:this.query,
                    pagenum:this.currentPage,
                    pagesize:this.pageSize
                }
            }
            getUserList(params).then(res=>{
                this.userList = res.data.users;
                this.total = res.data.total;
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


