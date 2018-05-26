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
        <el-button type="primary" plain>添加角色</el-button>

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
                    <el-button type="primary" icon="el-icon-edit" size="mini" plain></el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini" plain></el-button>
                    <el-button type="warning" icon="el-icon-check" size="mini" title="授权角色" plain @click="showDialog(scope.row)"></el-button>
                </template>
            </el-table-column>
        </el-table>
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
    </div>
</template>
<script>
import {getRoleList,deleteRoleJurisdiction,getJurisdictionList,grantRoleJurisdiction} from '@/api'
export default {
    data() {
      return {
        //  角色列表数据
        roleList: [],
        dialogVisible:false,
        // 权限列表数据
        jurisdictionList: [],
        defaultProps: {
          children: 'children',
          label: 'authName'
        },
        selectedJuristiction:[], //默认选中的权限id
        currentJuristiction:{} //保存点击的角色
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

