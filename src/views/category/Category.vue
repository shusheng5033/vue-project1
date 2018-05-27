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
                <el-button type="success" class="add-btn" plain @click="showCategory">添加分类</el-button>
            </el-col>
        </el-row>
        <!-- 添加分类对话框 -->
        <el-dialog title="添加用户" :visible.sync="addDialogFormVisible">
            <el-form :model="addForm"  label-width="80px"  :rules="rules" ref="addCateForm">
                <el-form-item label="分类名称" prop="cat_name">
                    <el-input v-model="addForm.cat_name" auto-complete="off"></el-input>
                </el-form-item>
                 <el-form-item label="父级名称">
                    <el-cascader
                        :options="options"
                        :props="props"
                        v-model="selectedOptions"
                        @change="handleChange">
                    </el-cascader>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="addCategory = false">取 消</el-button>
                <el-button type="primary" @click="addCateSubmit('addCateForm')">确 定</el-button>
            </div>
        </el-dialog>
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
import {getCategory,addCategory} from '@/api'
export default {
    data(){
        return {
            loading:false,
            addDialogFormVisible:false,
            props:{
                label:'cat_name',
                value:'cat_id'
            },
            dataSource: [],
            selectedOptions:[],
            options:[],
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
            ],
            addForm:{
                cat_name:'',
                cat_pid:0,
                cat_level:0
            },
            // 校验规则
            rules:{
                cate_name: [
                    { required: true, message: '请输入类名', trigger: 'blur' }
                ],
            }

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
        // 添加分类获取数据
        showCategory(){
            this.addDialogFormVisible = true;
            getCategory({type:2}).then(res => {
                console.log(res)
                if(res.meta.status === 200){
                    this.options = res.data
                }
            })
        },
        // 添加分类提交
        addCateSubmit(formName){
            this.$refs[formName].validate(value => {
                if(value){
                    if(this.selectedOptions.length === 0){
                       this.addForm.cat_pid = 0;
                       this.addForm.cat_level = 0;
                    } else if (this.selectedOptions.length === 1){
                        this.addForm.cat_level = 1;
                        this.addForm.cat_pid = this.selectedOptions[this.selectedOptions.length-1];//底层决定上层
                    } else if (this.selectedOptions.length === 2){
                        this.addForm.cat_level = 2;
                        this.addForm.cat_pid = this.selectedOptions[this.selectedOptions.length-1];//底层决定上层
                    }
                    addCategory(this.addForm).then(res => {
                        if(res.meta.status === 201){
                            this.addDialogFormVisible = false;
                            this.$message({
                                type:'success',
                                message:res.meta.msg
                            })
                        }    
                    })
                }
            })
        },
        handleChange(value) {
            this.selectedOptions = value;
        }
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


