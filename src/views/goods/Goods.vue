<template>
    <div class="goods">
        <!-- 面包屑 -->
        <el-row>
            <el-col :span="24">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>商品管理</el-breadcrumb-item>
                    <el-breadcrumb-item>商品列表</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
        </el-row>
        <!-- 添加商品 -->
        <el-row>
            <el-col :span="24">
                <el-input placeholder="请输入内容" class="search-input" v-model="query" @keyup.native.enter="initList">
                    <el-button slot="append" icon="el-icon-search" @click="initList"></el-button>
                </el-input>
                <el-button type="success" plain @click="addGoods">添加商品</el-button>
            </el-col>
        </el-row>
        <!-- 商品展示表格 -->
        <el-table :data="goodsList" border style="width: 100%">
            <el-table-column align="center" prop="goods_id" width="80" label="编号"></el-table-column>
            <el-table-column prop="goods_name" label="商品名称" width="360"></el-table-column>
            <el-table-column align="center"  prop="goods_price" label="商品价格" width="120"></el-table-column>
            <el-table-column align="center"  label="商品状态" width="120">
                <template slot-scope="scope">
                    <span>{{scope.row.goods_state | fmtStatus}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center"  prop="goods_weight" label="商品重量" width="120"></el-table-column>
            <el-table-column align="center"  label="商品创建时间" width="180">
                <template slot-scope="scope">
                    <span>{{scope.row.add_time | fmtDate}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center"  label="商品更新时间" width="180">
                <template slot-scope="scope">
                    <span>{{scope.row.upd_time | fmtDate}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center"  label="是否是热销品" width="120">
                <template slot-scope="scope">
                    <span>{{scope.row.is_promote | fmtHot}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center"  prop="hot_mumber" label="热销品数量" width="120"></el-table-column>
            <el-table-column align="center"  label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" size="mini" plain title="编辑用户" @click="showEditDialog(scope.row)"></el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini" plain title="删除用户" @click="showDeleteDialog(scope.row)"></el-button>
                    <el-button type="warning" icon="el-icon-check" size="mini" plain title="分配角色" @click="showGrantDialog(scope.row)"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <div class="page">
             <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pagenum"
                :page-sizes="[10, 20, 30, 40, 50]"
                :page-size='pagesize'
                layout="total, sizes, prev, pager, next, jumper"
                :total='total'>
            </el-pagination>
        </div>
    </div>
</template>
<script>
import {getGoods} from '@/api'
export default {
    data(){
        return {
            goodsList:[],
            query:'',
            pagenum:1,
            pagesize:10,
            total:0
        }
    },
     // 过滤器
    filters: {
        // 过滤状态
        fmtStatus(val){
            if(val === '0'){
                return '未通过'
            } else if(val === '1'){
                return '审核中'
            } else {
                return '未审核'
            }
        },
        //过滤时间戳
        fmtDate(val){
            let time = new Date(val*1000);
            let year = time.getFullYear();
            let month = time.getMonth()+1;
            let day = time.getDate() < 10?'0' + time.getDate() : '' + time.getDate();
            let hours = time.getHours();
            let minutes = time.getMinutes();
            let seconds = time.getSeconds();
            return year + '-' + month +'-'+ day + ' ' + hours + ':' + minutes + ':' + seconds
        },
        //是否是热销品 进行判断
        fmtHot(val){
            if(val === true){
                return '是'
            } else if (val === false) {
                return '否'
            }
        }
    },
    mounted(){
        this.initList();
    },
    methods:{
         //每页显示条数改变
        handleSizeChange(val) {
            this.pagesize = val;
            this.initList();
        },
        //当前页码改变
        handleCurrentChange(val) {
            this.pagenum = val;
            this.initList();
        },
        // 添加商品跳转
        addGoods(){
            this.$router.push({name:'addGoods'});
        },
        // 初始化商品数据
        initList(){
            let params = {
                params:{
                    query:this.query,
                    pagenum:this.pagenum,
                    pagesize:this.pagesize
                }
            }
            getGoods(params).then(res => {
                console.log(res);
                if(res.meta.status === 200){
                    this.goodsList = res.data.goods;
                    this.total = res.data.total;
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.goods {
    .search-input {
        width: 300px;
        margin-bottom:15px;
    }
    .page {
    padding: 5px 0;
    background-color: #D3DCE6;
    margin-top:15px;
  }
}
</style>

