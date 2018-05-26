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
                    <el-button type="warning" icon="el-icon-check" size="mini" plain></el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import {getRoleList,deleteRoleJurisdiction} from '@/api'
export default {
    data() {
      return {
        roleList: []
      }
    },
    methods:{
        // 删除权限功能
        deleteJurisdiction(row,jurisdictionId){
            deleteRoleJurisdiction({roleId:row.id,jurisdictionId:jurisdictionId}).then(res => {
                if(res.meta.status === 200){
                    row.children = res.data;
                    
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
        // 获取角色列表
        getRoleList().then(res => {
            if(res.meta.status === 200){
                console.log(res)
                this.roleList = res.data;
            }
        })
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
</style>

