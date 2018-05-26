<template>
    <div class="roles">
        <!-- 面包屑部分 -->
        <el-row>
            <el-col :span="24">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>权限管理</el-breadcrumb-item>
                    <el-breadcrumb-item>角色列表</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
        </el-row>
        <el-button type="primary" plain @click="addDialogFormVisible=true">添加角色</el-button>
        <!-- 添加角色模态框 -->
        <el-dialog title="添加角色" :visible.sync="addDialogFormVisible">
            <el-form :model="addForm"  label-width="80px"  :rules="rules" ref="addRoleForm">
                <el-form-item label="角色名称" prop="roleName">
                    <el-input v-model="addForm.roleName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" prop="roleDesc">
                    <el-input v-model="addForm.roleDesc" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addDialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addRoleSubmit('addRoleForm')">确 定</el-button>
            </div>
        </el-dialog>
        <el-table
            class = "mt-20"
            border
            :data="roleList"
            style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="scope">
                    <el-row v-for="firstChildren in scope.row.children" :key="firstChildren.id">
                        <el-col :span="2">
                            <el-tag closable @close="deleteJurisdiction(scope.row,firstChildren.id)">{{firstChildren.authName}}</el-tag>
                            <i class="el-icon-arrow-right" v-if="firstChildren.children.length !== 0"></i>
                        </el-col>
                        <el-col :span="22">
                            <el-row  v-for="secondChildren in firstChildren.children" :key="secondChildren.id">
                                <el-col :span="2">
                                    <el-tag closable type="success" @close="deleteJurisdiction(scope.row,secondChildren.id)">{{secondChildren.authName}}</el-tag>
                                    <i class="el-icon-arrow-right" v-if="secondChildren.children.length !== 0"></i>
                                </el-col>
                                <el-col :span="22">
                                    <el-tag closable type="warning" v-for="thirdChildren in secondChildren.children" :key="thirdChildren.id"  @close="deleteJurisdiction(scope.row,thirdChildren.id)">{{thirdChildren.authName}}</el-tag>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                    <el-row v-if="scope.row.children.length === 0">
                        该角色没有分配权限，请前往分配！
                    </el-row>
                </template>
            </el-table-column>
            <el-table-column label="角色名称" prop="roleName" width="120px">

            </el-table-column>
            <el-table-column label="描述" prop="roleDesc" width="125px">

            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" size="mini" title="编辑角色" plain @click ="showEditDialog(scope.row)"></el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini" title="删除角色" plain @click="showDeleteDialog(scope.row)"></el-button>
                    <el-button type="warning" icon="el-icon-check" size="mini" title="授权角色" plain @click="showDialog(scope.row)"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 授权角色模态框 -->
        <el-dialog title="授权角色" :visible.sync="dialogVisible">
            <div class="treeList">
                <el-tree
                    :data="jurisdictionList"
                    show-checkbox
                    node-key="id"
                    ref="tree"
                    :default-expand-all="true"
                    :default-checked-keys="selectedJuristiction"
                    :props="defaultProps">
                </el-tree>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitGrant">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 编辑角色对话框 -->
        <el-dialog title="编辑角色" :visible.sync="editDialogFormVisible">
            <el-form :model="editForm"  label-width="80px"  :rules="rules" ref="editRoleForm">
                <el-form-item label="角色名" prop="roleName">
                    <el-input v-model="editForm.roleName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" prop="roleDesc">
                    <el-input v-model="editForm.roleDesc" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editDialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="editRoleSubmit('editRoleForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import {getRoleList,deleteRoleJurisdiction,getJurisdictionList,grantRoleJurisdiction,addRole,deleteRole,getRoleById,editRole} from '@/api'
export default {
    data() {
      return {
        //  角色列表数据
        roleList: [],
        // 授权
        dialogVisible:false,
        // 添加
        addDialogFormVisible:false,
        // 编辑
        editDialogFormVisible:false,
        // 权限列表数据
        jurisdictionList: [],
        defaultProps: {
          children: 'children',
          label: 'authName'
        },
        selectedJuristiction:[], //默认选中的权限id
        currentJuristiction:{}, //保存点击的角色
        // 添加表单
        addForm:{
            roleName:'',
            roleDesc:''
        },
        editForm:{
            roleName:'',
            roleDesc:'',
            id:0
        },
        // 添加角色表单规则
        rules: {
            roleName: [
                { required: true, message: '请输入角色名', trigger: 'blur' }
            ],
            roleDesc: [
                { required: false, message: '请输入密码', trigger: 'change' }
            ],
        }
      }
    },
    methods:{
        // 初始化数据
        initRoleList(){
            // 获取角色列表
            getRoleList().then(res => {
                if(res.meta.status === 200){
                    this.roleList = res.data;
                }
            })
        },
        // 删除权限功能
        deleteJurisdiction(row,jurisdictionId){
            deleteRoleJurisdiction({roleId:row.id,jurisdictionId:jurisdictionId}).then(res => {
                if(res.meta.status === 200){
                    // 将该行角色权限数据数组重新重新赋值
                    row.children = res.data;
                } else {
                    this.$message({
                        type:'error',
                        message:res.meta.msg
                    })
                }
            })
        },
        showDialog(row){
            this.dialogVisible = true;
            this.currentJuristiction = row;
            getJurisdictionList({type:'tree'}).then(res => {
                if(res.meta.status === 200){
                    this.jurisdictionList = res.data;
                } else {
                    this.$message({
                        type:'error',
                        message:res.meta.msg
                    })
                }
            })
            this.selectedJuristiction = [];
            // 只需要遍历到第三层的数据即可，上面两层都只有一个
            this.currentJuristiction.children.forEach(first => {
                if(first.children && first.children.length !== 0){
                    first.children.forEach(second => {
                        if(second.children && second.children.length!==0){
                            second.children.forEach(third => {
                                this.selectedJuristiction.push(third.id);
                                console.log(this.selectedJuristiction);
                            })
                        }
                    })
                }
            })
        },
        // 提交授权
        submitGrant(){
            // 将数组转换成字符串
            let ids = this.$refs.tree.getCheckedKeys().join(",");
            let params = {
                    roleId:this.currentJuristiction.id,
                    rids:{
                        rids:ids
                    }
            }
            grantRoleJurisdiction(params).then(res => {
                console.log(res)
                if(res.meta.status === 200){
                    this.$message({
                        type:'success',
                        message:res.meta.msg
                    })
                    this.dialogVisible = false;
                    this.initRoleList();
                } else {
                    this.$message({
                        type:'error',
                        message:res.meta.msg
                    })
                }
            })
        },
        // 添加角色
        addRoleSubmit(formName){
            this.$refs[formName].validate(value => {
                if(value){
                    addRole(this.addForm).then(res => {
                        if(res.meta.status === 201){
                            this.$message({
                                type:'success',
                                message:'创建角色成功'
                            })
                            this.addDialogFormVisible = false;
                            this.initRoleList();
                        }
                    })
                }
            })
        },
        // 删除角色
        showDeleteDialog(row){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
            }).then(() => {
                deleteRole(row).then(res => {
                    if(res.meta.status === 200){
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.initRoleList();
                    }else {
                        this.$message({
                            type: 'warning',
                            message: res.meta.msg
                        });
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        // 编辑框开启
        showEditDialog(row){
            this.editDialogFormVisible = true;
            getRoleById(row).then(res => {
                if(res.meta.status === 200){
                    this.editForm.roleName = res.data.roleName;
                    this.editForm.roleDesc = res.data.roleDesc;
                    this.editForm.id = res.data.roleId;
                }else {
                    this.$message({
                        type:'warning',
                        message:this.meta.msg
                    })
                }
            })
        },
        //编辑提交
        editRoleSubmit(formName){
            this.$refs[formName].validate(value => {
                if(value){
                    editRole(this.editForm).then(res => {
                        console.log(res);
                        if(res.meta.status === 200){
                            this.$message({
                                type:'success',
                                message:'编辑成功'
                            })
                            this.editDialogFormVisible = false;
                            this.initRoleList();
                        }else {
                            this.$message({
                                type:'warning',
                                message:this.meta.msg
                            })
                        }
                    })
                }
            })
        }
    },
    mounted(){
        this.initRoleList();
    }
}
</script>
<style lang="scss" scoped>
    .roles {
        .el-tag {
            margin-right:5px;
            margin-bottom:5px;
        }
    }
    .treeList {
        height: 300px;
        overflow:auto;
    }
</style>

