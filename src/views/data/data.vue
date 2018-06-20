<template>
    <div class="report">
        数据报表部分(饼图，折线，柱状图)
    </div>
</template>
<script>
import {getReport} from '@/api'
export default {
    data(){
        return {

        }
    },
    mounted(){
        this.getreport();
        
    },
    methods:{
        getreport(){
            getReport({type:'1'}).then(res => {
                console.log(res);
                console.log(this.$store.state);
            })
        }
    }
}
</script>
<style lang="scss" scoped>

</style>

