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
                <el-button type="success" plain @click="addDialogFormVisible=true">添加用户</el-button>
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
        <!-- 分页组件 -->
        <div class="page">
             <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[2, 4, 6, 8]"
                :page-size='pageSize'
                layout="total, sizes, prev, pager, next, jumper"
                :total='total'>
            </el-pagination>
        </div>
        <!-- 添加用户对话框 -->
        <el-dialog title="添加用户" :visible.sync="addDialogFormVisible">
            <el-form :model="addForm"  label-width="80px"  :rules="rules" ref="addUserForm">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="addForm.username" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="addForm.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="addForm.email" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="mobile">
                    <el-input v-model="addForm.mobile" auto-complete="off"></el-input>
                </el-form-item>
             
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addUserSubmit('addUserForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import {getUserList,changeUserState,addUser} from '@/api'
export default {
    data() {
      return {
        userList: [],
        query:'',
        total:0,
        pageSize:2,
        currentPage:1,
        addDialogFormVisible:false,
        addForm:{
            username:'',
            password:'',
            email:'',
            mobile:''
        },
        rules: {
            username: [
                { required: true, message: '请输入用户名', trigger: 'blur' }
            ],
            password: [
                { required: true, message: '请输入密码', trigger: 'blur' }
            ],
            email: [
                { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
            ],
            mobile: [
                { required: true, message: '电话不能为空' }
            ]
        }
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
        // 添加用户
        addUserSubmit(formName){
            this.$refs[formName].validate(value=>{
                if(value){
                    addUser(this.addForm).then(res => {
                        if(res.meta.status === 201){
                            this.$message({
                                type:'success',
                                message:'创建用户成功'
                            })
                        }
                        this.addDialogFormVisible = false;
                        this.initList();
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


