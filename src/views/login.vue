<template>
    <div class="login">
        <el-form ref="form" :model="form" class="container">
            <el-form-item>
                <img src="../assets/avatar.jpg" class="avtar">
            </el-form-item>
            <el-form-item>
                <el-input v-model="form.username" placeholder="账户" prefix-icon="myicon myicon-user"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="form.password" placeholder="密码" prefix-icon="myicon myicon-key"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class = "login-btn">登录</el-button>
            </el-form-item>
        </el-form>    
    </div>
</template>
<script>
    export default {
        data(){
            return {
                form:{
                    username:'',
                    password:''
                }    
            }
        }
    }
</script>
<style lang="scss" scoped>
    // 登录界面固定定位
    .login {
        position:fixed;
        width:100%;
        height:100%;
        // 页面背景色
        background-color:#2f4050;
        //表单部分
        .container {
            // 设置相对定位 一个是将该盒子变为行内块元素 另一个是为了子元素相对于该元素进行定位
            position:absolute;
            left:50%;
            top:50%;
            width:400px; //登录表单整体宽度400px
            background-color:#fff; //给定表单背景色
            padding:0 15px 40px 15px;
            transform: translate(-50%,-50%);
        }
        // 头像部分
        .avtar {
            width:120px;
            height:120px;
            border-radius: 50%;
            position:relative;
            left:50%;
            margin-left:-60px;
            margin-top:-60px;
            border:10px solid #fff;
            box-sizing: border-box; //让盒子大小包含边框
            box-shadow: 0 1px 5px #ccc; //加一个边框阴影 显示白底下的边框效果
            overflow:hidden;
        }
        // 按钮宽度设为与父元素同宽
        .login-btn {
            width: 100%;
        }
    }
</style>