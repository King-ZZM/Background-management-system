<template>
    <div class="card" id="card">
        <i class="iconfont" :class="data.icon" :style="{color:data.color}"></i>
        <div class="content">
            <div class="total">
                {{data.title}}
            </div>
            <div class="money">
                {{data.num}}
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        data:{
            type:Object,
            default:{}
        }
    }

}
</script>
<style lang="less" scoped>
    .card {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 100px;
        width: 23%;
        background-color: #fff;
        .iconfont {
            font-size: 50px;
        }
        .content {
            display: flex;
            flex-direction: column;
            align-items: center;
            .total {
                margin-bottom: 5px;
                color: #cecece;
                font-size: 20px;
            }
            .money {
                font-size: 20px;
                font-weight: 700;
            }
        }
    }
    @media screen and (max-width: 650px){
        #card {
            width: 100%;
        }
    }
</style>