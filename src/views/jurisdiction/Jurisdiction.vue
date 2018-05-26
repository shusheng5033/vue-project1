<template>
    <div class="juristiction">
        <!-- 面包屑部分 -->
        <el-row>
            <el-col :span="24">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>权限管理</el-breadcrumb-item>
                    <el-breadcrumb-item>权限列表</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
        </el-row>
        <!-- 表格部分 -->
        <el-table :data="jurisdictionList" stripe border style="width: 100%" v-loading="loading">
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="authName" label="权限名称" width="200"></el-table-column>
            <el-table-column prop="path" label="路径"  width="250"></el-table-column>
            <el-table-column label="层级" width="180">
                <template slot-scope="scope">
                    <span>{{scope.row.level | fmtLeval}}</span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import {getJurisdictionList} from '@/api'
export default {
    data(){
        return {
            loading:false,
            jurisdictionList:[]
        }
    },
    // 过滤器
    filters: {
        fmtLeval(val){
            if(val === '0'){
                return '一级'
            } else if(val === '1'){
                return '二级'
            } else {
                return '三级'
            }
        }
    },
    mounted(){
        this.loading = true;
        // 钩子中调用获取权限列表
        getJurisdictionList({type:'list'}).then(res => {
            console.log(res)
            if(res.meta.status === 200){
                this.jurisdictionList = res.data;
                this.loading = false;
            }
        })
    },
    methods:{

    }
}
</script>
<style lang="scss" scoped>

</style>

