<template>
    <div class="home">
        <el-container>
            <el-aside width="auto">
                <div class="logo"></div>
                <el-menu
                    class="el-menu-admin"
                    :unique-opened = "true"
                    :router = "true"
                    :collapse = "isCollapse"
                    @open="handleOpen"
                    @close="handleClose"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                    <el-submenu :index = 'item.path' v-for="item in menus" :key="item.id">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>{{item.authName }}</span>
                        </template>
                        <el-menu-item :index="tag.path" v-for="tag in item.children" :key="tag.id">
                            <i class="el-icon-menu"></i>
                            <span>{{tag.authName}}</span>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-container>
                <el-header>
                    <!-- header部分 -->
                    <i class="myicon myicon-menu toggle-btn" @click="toggleCollapse"></i>
                    <div class="system-title">VUE后台管理系统</div>
                    <div>
                        <span class="welcome">欢迎，{{$store.getters.username}}</span>
                        <el-button type="text" @click="out">退出</el-button>
                    </div>
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container> 
    </div>    
</template>
<script>
    import {getMenus} from '@/api'
    export default {
        data(){
            return {
                isCollapse:false,
                menus:[]
            }
        },
        methods: {
            // 获取侧边栏菜单
            initMenus(){
                getMenus().then(res => {
                    console.log(res);
                    if(res.meta.status === 200){
                        this.menus = res.data;
                    }
                })
            },
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            // 侧边栏隐藏显示
            toggleCollapse(){
                this.isCollapse = !this.isCollapse;
            },
            // 用户退出按钮
            out(){
                // 清除localStorage
                localStorage.removeItem('mytoken');
                // 并且跳转到登录页面
                this.$router.push({name:'login'});
            }
        },
        mounted(){
            this.initMenus();
        }
    }
</script>
<style lang="scss" scoped>
    .home {
        height: 100%;
        background-color: #E5E5E5;
        .el-menu-admin:not(.el-menu--collapse) {
            width: 200px;
            min-height: 400px;
        }
        .el-container {
            height: 100%;
        }
        .el-aside {
            background-color: #545c64;
        }
        .el-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #009688;
        }
        .logo {
            height:60px;
            background: url(../assets/logo.png) no-repeat center;
            background-size: contain;
            background-color: white;
        }
        .toggle-btn {
            padding: 0 10px;
            margin-left: -20px;
            font-size: 36px;
            line-height: 60px;
            color: white;
            cursor: pointer;
            &:hover {
            background-color: #00635a;
            }
        }
        .system-title {
            font-size: 28px;
            color: white;
        }
        .welcome, {
            color: white;
        }
    }
</style>