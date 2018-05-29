<template>
    <div class="addGoods">
        <el-row>
            <el-col :span="24">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>商品管理</el-breadcrumb-item>
                    <el-breadcrumb-item>商品列表</el-breadcrumb-item>
                    <el-breadcrumb-item>添加商品</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
        </el-row>
        <!-- 步骤条 -->
        <el-steps :active="active" finish-status="success">
            <el-step title="步骤 1"></el-step>
            <el-step title="步骤 2"></el-step>
            <el-step title="步骤 3"></el-step>
            <el-step title="步骤 4"></el-step>
            <el-step title="步骤 5"></el-step>
        </el-steps>
        <el-tabs v-model="activeName" tab-position="left" @tab-click="handleClick">
            <el-tab-pane label="基本信息" name="first">基本信息</el-tab-pane>
            <el-tab-pane label="商品参数" name="second">商品参数</el-tab-pane>
            <el-tab-pane label="商品属性" name="third">商品属性</el-tab-pane>
            <el-tab-pane label="商品图片" name="fourth">商品图片</el-tab-pane>
            <el-tab-pane label="商品内容" name="fifth">商品内容</el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
export default {
    data(){
        return {
            active:0,
            activeName:'first'
        }
    },
    methods:{
        handleClick(tab, event) {
            console.log(tab, event);
        }
    }
}
</script>
<style lang="scss" scoped>
.addGoods {
    .el-tabs {
        margin-top: 20px;
    }
}
</style>
