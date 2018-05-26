<template>
    <div class="category">
        <el-row>
            <el-col :span="24">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>商品管理</el-breadcrumb-item>
                    <el-breadcrumb-item>商品分类</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-button type="success" class="add-btn" plain @click="addDialogFormVisible=true">添加商品</el-button>
            </el-col>
        </el-row>
        <tree-grid
            v-loading="loading"
            :treeStructure="true"
            :columns="columns"
            :data-source="dataSource"
            @deleteCate="deleteCategory"
            @editCate="editCategory"
            >
        </tree-grid>
        <!-- 分页组件 -->
        <div class="page">
             <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="[5, 10, 15, 20]"
                :current-page.sync="currentPage"
                :page-size="pagesize"
                :total = "total"
                layout="total, sizes, prev, pager, next, jumper"
                >
            </el-pagination>
        </div>
    </div>
</template>
<script>
import TreeGrid from '@/components/TreeGrid/TreeGrid'
import {getCategory} from '@/api'
export default {
    data(){
        return {
            loading:false,
            addDialogFormVisible:false,
            dataSource: [],
            total:0,
            currentPage:1,
            pagesize:10,
            columns: [
                {
                text: '分类名称',
                dataIndex: 'cat_name',
                width: ''
                }, 
                {
                text: '是否有效',
                dataIndex: 'cat_deleted',
                width: ''
                }, 
                {
                text: '排序',
                dataIndex: 'cat_level',
                width: ''
                }
            ]
        }
    },
    components:{
        TreeGrid
    },
    mounted(){
        this.initList();
    },
    methods:{
        initList(){
            this.loading = true;
            let params = {
                params:{
                    type:'3',
                    pagenum:this.currentPage,
                    pagesize:this.pagesize
                }
            }
            getCategory(params).then(res => {
                if(res.meta.status === 200){
                    this.total = res.data.total;
                    this.dataSource = res.data.result;
                }
            })
            this.loading = false;
        },
        deleteCategory (cid) {
            console.log(cid)
        },
        editCategory (cid) {
            console.log(cid)
        },
        //每页显示条数改变
        handleSizeChange(val) {
            this.pagesize = val;
            this.initList();
        },
        //当前页码改变
        handleCurrentChange(val) {
            this.currentPage = val;
            this.initList();
        },
    }
}
</script>
<style lang="scss" scoped>
    .category {
        .add-btn {
            margin-bottom:15px;
        }
        .page{
            padding: 5px 0;
            background-color: #D3DCE6;
            margin-top:15px;
        }
    }
</style>


