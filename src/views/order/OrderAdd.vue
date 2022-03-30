<template>
    <Panel name="订单编辑">
        
    </Panel>
</template>
<script>
// 引入面板
import Panel from "@/components/Panel"

export default {
    // 注册
    components:{ Panel},
    data(){
        return {
            id:'',
        }
    },
    created(){
        this.id = this.$route.query.id
        console.log(this.id);
    }
}
</script>
<style lang="less" scoped>
    
</style>