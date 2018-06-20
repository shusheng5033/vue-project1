<template>
    <div class="orders">
        订单页面
    </div>
</template>
<script>
import {getOrders} from '@/api'
export default {
    data(){
        return {
            ordersList:[]
        }
    },
    methods:{
        initList(){
            let params = {
                params:{
                    query:1,
                    pagenum:1,
                    pagesize:10,
                    user_id:47
                }
            }
           
        }
    }
}
</script>
<style lang="scss" scoped>

</style>

